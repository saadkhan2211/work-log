import { Request, Response } from "express";
import { IResponse } from "../../types/response";
import { User } from "../../schemas/user";
import { generateOtp } from "../../helpers/otp";
import { sendEmail } from "../../helpers/email";

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<Response<IResponse>> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found!" });
    }

    const otp = await generateOtp();

    const emailSent = await sendEmail(
      email,
      "Your Oralytics Verification Code",
      `Your OTP is: ${otp}. It will expire in 10 minutes.`,
      `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 30px; color: #333;">
          <!-- Logo / Brand -->
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://via.placeholder.com/64x64.png?text=O" alt="Oralytics Logo" style="width:64px;height:64px;margin-bottom:10px;" />
            <h2 style="margin: 0; font-size: 22px; color: #8D5CA1;">Oralytics</h2>
          </div>

          <!-- Title -->
          <h3 style="text-align: center; font-size: 20px; font-weight: 600; margin-bottom: 15px;">
            Verify your Oralytics account
          </h3>

          <!-- Instructions -->
          <p style="text-align: center; font-size: 15px; line-height: 1.6; margin: 0 0 25px;">
            We received a request to reset your password. Please use the code below to continue.
          </p>

          <!-- OTP Box -->
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background: #f2f2f2; color: #333; font-size: 28px; font-weight: bold; letter-spacing: 6px; padding: 15px 25px; border-radius: 8px;">
              ${otp}
            </div>
          </div>

          <!-- Note -->
          <p style="text-align: center; font-size: 14px; color: #555; margin: 0 0 20px;">
            This code will expire in <b>10 minutes</b>. If you didn’t request a password reset, you can safely ignore this email.
          </p>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

          <!-- Footer -->
          <div style="text-align: center; font-size: 13px; color: #999;">
            &copy; ${new Date().getFullYear()} Oralytics. All rights reserved.<br/>
            Building smarter dental care with AI.
          </div>
        </div>`
    );

    if (!emailSent) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to send OTP email" });
    }

    return res.status(200).json({
      success: true,
      message: "We have sent you OTP on your registered email address",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
