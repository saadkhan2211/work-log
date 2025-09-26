import { Request, Response } from "express";
import { User } from "../../schemas/user";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../../configs/envs";

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUND);
    const updatePassword = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    await updatePassword?.save();
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
