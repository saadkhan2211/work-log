import { Request, Response } from "express";
import { Otp } from "../../schemas/otp";

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const verify = await Otp.findOne({ email, otp });
    if (!verify) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    } else if (
      new Date().getTime() - verify.createdAt.getTime() >
      5 * 60 * 1000
    ) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    } else {
      return res.status(200).json({ success: true, message: "OTP verified" });
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
