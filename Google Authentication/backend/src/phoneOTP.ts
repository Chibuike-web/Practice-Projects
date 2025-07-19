import twilio from "twilio";

export async function sendPhoneOTP(phone: string, otp: string) {
	const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

	await twilioClient.messages.create({
		body: `Your OTP is ${otp}`,
		from: process.env.TWILIO_PHONE_NUMBER,
		to: phone,
	});
}
