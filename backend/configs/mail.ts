import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../configs/envs";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
