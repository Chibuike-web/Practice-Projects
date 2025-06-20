import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendPhoneOTP(phone: string, otp: string) {
	await twilioClient.messages.create({
		body: `Your OTP is ${otp}`,
		from: process.env.TWILIO_PHONE_NUMBER,
		to: phone,
	});
}
