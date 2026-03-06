"use server";

import nodemailer from "nodemailer";

export type FormState = {
  success: boolean;
  message: string;
} | null;

export async function sendEmail(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const subject = (formData.get("subject") as string)?.trim();
  const body = (formData.get("body") as string)?.trim();

  if (!name || !email || !subject || !body) {
    return { success: false, message: "Please fill in all fields." };
  }

  // Basic email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.GMAIL_USER}>`,
    replyTo: email,
    to: "jkenna817@gmail.com",
    subject: `Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${body}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <hr/>
           <p>${body.replace(/\n/g, "<br/>")}</p>`,
  });

  return { success: true, message: "Message sent! I'll be in touch soon." };
}
