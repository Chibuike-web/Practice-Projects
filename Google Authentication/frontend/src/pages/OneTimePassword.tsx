import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { VerificationIcon } from "../components/Icons";
import { FormEvent, useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import Button from "../components/Button";
import { useLoading, useUser } from "../Hooks";

export default function OneTimePassword() {
	const { user, parsedUser, loading } = useUser(true);

	if (loading || !user || !parsedUser) return null;

	return (
		<main className="w-full max-w-[500px] mx-auto mt-[88px]">
			<Link to={"/verify-account"} className="flex items-center text-primary">
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
					<OtpInputs id={user.id} />
				</div>
			</section>
		</main>
	);
}

const OtpInputs = ({ id }: { id: string }) => {
	const [values, setValues] = useState(Array(6).fill(""));
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const { isLoading, setIsLoading } = useLoading();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").trim();
		const arr = Array.from(pastedData);

		if (arr.length > 6) {
			setError("The code should be only 6 digits");
			return;
		}

		if (!arr.every((char) => /^\d$/.test(char))) {
			setError("Check the codes again. Only numbers are allowed");
		}
		setValues(arr);
	};

	const handleBackSpace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === "Backspace") {
			if (inputRefs.current[index]?.value.trim() === "") {
				e.preventDefault();
				if (index > 0) {
					const newValues = [...values];
					newValues[index - 1] = "";
					setValues(newValues);
					inputRefs.current[index - 1]?.focus();
				}
			}
		}
	};

	const handleChange = (e: FormEvent<HTMLInputElement>, index: number) => {
		const { value } = e.currentTarget;
		if (!/^\d?$/.test(value)) return;

		const newValues = [...values];
		newValues[index] = value;
		setValues(newValues);

		if (index < inputRefs.current.length - 1 && value !== "") {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		const otp = values.join("");
		setIsLoading(true);
		try {
			const res = await fetch("http://localhost:1234/auth/otp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: id, otp: otp }),
			});
			if (!res.ok) {
				const errorData = await res.json();
				setError(errorData.message);
				return;
			}
			const data = await res.json();
			setSuccess(data.message);
			setTimeout(() => navigate("/success"), 1000);
			setValues([]);
		} catch (err) {
			console.log("Issue verifying OTP", err);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="w-full">
			<legend className="flex gap-4 justify-between mt-16 mb-12">
				{values.map((value, index) => (
					<input
						key={index}
						type="text"
						ref={(el) => {
							inputRefs.current[index] = el;
						}}
						inputMode="numeric"
						maxLength={1}
						value={value}
						className="border border-gray-300 focus:border-gray-800 size-16 rounded-md justify-items-center content-center text-xl bg-gray-50"
						onChange={(e) => handleChange(e, index)}
						onKeyDown={(e) => handleBackSpace(e, index)}
						onPaste={handlePaste}
					/>
				))}
			</legend>

			<Button
				variant={values.every((value) => value !== "") && !isLoading ? "primary" : "disabled"}
				disabled={isLoading}
			>
				{isLoading ? (
					<span className="flex gap-2 items-center justify-center">
						<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
						Verifying...
					</span>
				) : (
					"Verify"
				)}
			</Button>
			{error && (
				<p className="mt-4 rounded-md bg-red-100 text-center text-red-700 px-4 py-3 border border-red-300">
					{error}
				</p>
			)}
			{success && (
				<p className="mt-4 rounded-md bg-green-100 text-center text-green-700 px-4 py-3 border border-green-300">
					{success}
				</p>
			)}

			<p className="mt-4 text-center text-gray-500">
				Didn’t receive a code? <span className="text-primary font-medium">Resend code</span>
			</p>
		</form>
	);
};
