import nodemailer from "nodemailer";

const user = process.env.EMAIL_USERNAME;
const pass = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user,
    pass,
  },
});

export async function sendConfirmationEmail(to: string, token: string) {
  await transporter.sendMail({
    from: `"Ahmed Ibrahim" <${user}>`,
    to,
    subject: "Welcome! Confirm You Email",
    html: `
          <h1>Thank you!</h1>
          <div>
              <a href="https://server.ahmedibrahim.dev/api/v1/email/confirm?token=${token}" target="_blank">Click here to confirm your email...</a>
          </div>
        `,
  });
}

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `"Ahmed Ibrahim" <${user}>`,
    to,
    subject,
    html,
  });
}
