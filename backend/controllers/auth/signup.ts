import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../schemas/user";
import { IResponse } from "../../types/response";
import { SALT_ROUND } from "../../configs/envs";

export const signup = async (
  req: Request,
  res: Response
): Promise<Response<IResponse>> => {
  try {
    const { name, email, password, role, hospital } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      hospital,
      subscription: null,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
