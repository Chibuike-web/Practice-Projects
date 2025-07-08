import nodemailer from "nodemailer";

export async function sendEmailOTP(to: string, otp: string) {
	console.log("EMAIL_USER:", process.env.EMAIL_USER);
	console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject: "Verify your email",
		text: `Your verification code is: ${otp}`,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("OTP email sent successfully");
	} catch (error) {
		console.error("Failed to send OTP email:", error);
	}
}
