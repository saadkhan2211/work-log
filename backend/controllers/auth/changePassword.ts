import { Request, Response } from "express";
import { User } from "../../schemas/user";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../../configs/envs";

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUND);
    const updatePassword = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    await updatePassword?.save();
    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
