import { transporter } from "../configs/mail";

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  try {
    const info = await transporter.sendMail({
      from: `"Dental AI" <nighthawk.og01@gmail.com>`,
      to,
      subject,
      text,
      html,
    });
    console.log("📧 Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
}
