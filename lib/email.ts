import nodemailer, { SentMessageInfo } from 'nodemailer';

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

export async function sendVerificationEmail(
  to: string,
  verificationToken: string,
  username: string
) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}&email=${to}`;

  const mailOptions = {
    from: `"Stable.fun" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Stable.fun!</h2>
        <p>Hi ${username},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #00BCD4; 
                    color: white; 
                    padding: 12px 30px; 
                    text-decoration: none; 
                    border-radius: 5px; 
                    display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="color: #666;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          If you didn't create an account with Stable.fun, please ignore this email.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return true;

  } catch (err: unknown) {
    console.error("Error sending verification email:", err);
    
    if (err instanceof Error) {
      if (err.message === 'Email timeout') {
        throw new Error("Email sending timed out, please try again");
      }
    }
    
    if (err && typeof err === 'object' && 'code' in err) {
      if (err.code === 'EAUTH') {
        throw new Error("Email authentication failed. Please check credentials.");
      } else if (err.code === 'ETIMEDOUT') {
        throw new Error("Email sending timed out. Please try again.");
      }
    }
    
    throw new Error("Failed to send verification email");
  }
}

export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log("Email configuration verified");
    return true;
  } catch (error) {
    console.error("Email configuration error:", error);
    return false;
  }
}