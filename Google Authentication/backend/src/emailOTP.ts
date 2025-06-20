import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

export async function sendEmailOTP(to: string, otp: string) {
	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to,
		subject: "Verify your email",
		text: `Your OTP is ${otp}`,
	});
}
