export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	checked: boolean;
	isVerified: boolean;
	otp?: string;
}
