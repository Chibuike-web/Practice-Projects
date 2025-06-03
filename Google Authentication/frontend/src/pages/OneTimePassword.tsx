import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { VerificationIcon } from "../components/Icons";
import { FormEvent, useState } from "react";
import Button from "../components/Button";

export default function OneTimePassword() {
	return (
		<main className="w-full max-w-[500px] mx-auto mt-[88px]">
			<Link to="/verify-account" className="flex items-center text-primary">
				<ChevronLeft />
				Back
			</Link>
			<section className="w-full grid place-items-center h-[calc(100vh-88px)] px-4">
				<div className="flex flex-col items-center w-full">
					<VerificationIcon />
					<div className="mt-5 w-full text-center">
						<h1 className="font-bold text-[2rem] tracking-tight">Enter the OTP</h1>
						<p className="text-light-gray leading-snug mt-4">
							To ensure the security of your Kulipal account, we require account verification.
						</p>
					</div>
					<OtpInputs />
				</div>
			</section>
		</main>
	);
}

const OtpInputs = () => {
	const [values, setValues] = useState(Array(6).fill(""));

	const handleChange = (e: FormEvent<HTMLInputElement>, index: number) => {
		const { value } = e.currentTarget;
		if (!/^\d?$/.test(value)) return;

		const newValues = [...values];
		newValues[index] = value;
		setValues(newValues);
	};
	return (
		<form action="" className="w-full">
			<legend className="flex gap-4 justify-between mt-16 mb-12">
				{values.map((value, index) => (
					<input
						key={index}
						type="text"
						inputMode="numeric"
						maxLength={1}
						value={value}
						className="border border-gray-300 focus:border-gray-800 size-16 rounded-md justify-items-center content-center text-xl bg-gray-50"
						onChange={(e) => handleChange(e, index)}
					/>
				))}
			</legend>
			<Button variant={values.every((value) => value !== "") ? "primary" : "disabled"}>
				Verify
			</Button>
			<p className="mt-4 text-center text-gray-500">
				Didn’t receive a code? <span className="text-primary font-medium">Resend code</span>
			</p>
		</form>
	);
};
