import nodemailer from "nodemailer";
import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from "../config/env.config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  //   port: 587,
  //   secure: false, // Use true for port 465, false for port 587
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  const info = await transporter.sendMail({
    from: `"EShop" <${NODEMAILER_EMAIL}>`,
    to,
    subject,
    text, // Plain-text version of the message
    html, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};
