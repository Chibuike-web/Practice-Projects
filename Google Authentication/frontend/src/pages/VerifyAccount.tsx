import { FormEvent, useState } from "react";
import Button from "../components/Button";
import { VerifyIcon, WarningIcon } from "../components/Icons";
import { twMerge } from "tailwind-merge";
import { Check } from "lucide-react";
import { useUser } from "../store/userStore";
import { useLoading } from "../Hooks";
import { useNavigate } from "react-router";

export default function VerifyAccount() {
	const [selectedMethod, setSelectedMethod] = useState<"email" | "phone" | null>(null);
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const navigate = useNavigate();
	const { isLoading, setIsLoading } = useLoading();
	const { userEmail } = useUser();

	const handleSelect = (e: FormEvent, method: "email" | "phone") => {
		e.preventDefault();
		setSelectedMethod((prev) => (prev === method ? null : method));
	};

	const getOptionStyle = (isSelected: boolean) =>
		twMerge(
			"w-full h-12 p-[14px] rounded-md bg-very-light-gray mt-4 flex items-center justify-start",
			isSelected && "border border-primary justify-between"
		);

	const renderInfoMessage = () => {
		if (selectedMethod === "email") {
			return (
				<div className="mt-4 flex items-start text-sm text-light-gray gap-2">
					<WarningIcon className="flex-shrink-0" />
					<span>A 6-digit verification code will be sent to the email you provided.</span>
				</div>
			);
		}
		if (selectedMethod === "phone") {
			return (
				<div className="mt-4 flex items-start text-sm text-light-gray gap-2">
					<WarningIcon className="flex-shrink-0" />
					<span>
						You’ll receive a 6-digit verification code to the phone number you provided. Text rates
						may apply.
					</span>
				</div>
			);
		}
		return null;
	};

	async function handleRequestOTP() {
		if (!selectedMethod) return;
		const payload: any = {
			email: userEmail,
			method: selectedMethod,
		};

		if (selectedMethod === "phone") {
			payload.phone = phoneNumber;
		}

		setIsLoading(true);
		try {
			const res = await fetch("http://localhost:1234/auth/request-verification", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const errorData = await res.json();
				console.log(errorData.message);
				return;
			}

			const data = await res.json();
			console.log(data.message);
			navigate("/otp");
		} catch (error) {
			console.log("Issue fetching OTP", error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<main className="grid place-items-center h-screen px-4">
			<div className="flex flex-col items-center w-full max-w-[500px]">
				<div className="flex flex-col items-center w-full max-w-[400px]">
					<VerifyIcon />
					<div className="mt-5 w-full text-center">
						<h1 className="font-bold text-[2rem] tracking-tight">Let's verify your account</h1>
						<p className="text-light-gray leading-snug mt-4">
							To ensure the security of your Kulipal account, we require account verification.
						</p>
					</div>
				</div>

				<div className="w-full mt-16">
					<Button
						variant="outline"
						className={getOptionStyle(selectedMethod === "email")}
						onClick={(e) => handleSelect(e, "email")}
					>
						<span>Email</span>
						{selectedMethod === "email" && <Check className="text-primary" />}
					</Button>
					<Button
						variant="outline"
						className={getOptionStyle(selectedMethod === "phone")}
						onClick={(e) => handleSelect(e, "phone")}
					>
						<span>Phone number</span>
						{selectedMethod === "phone" && <Check className="text-primary" />}
					</Button>

					{selectedMethod === "phone" && (
						<fieldset className="flex flex-col gap-2 mt-10">
							<label htmlFor="phone" className="text-sm text-dark-gray font-medium">
								Phone number
							</label>
							<input
								id="phone"
								type="tel"
								placeholder="Enter your phone number"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								required
								className="text-sm px-4 py-3 border border-input-stroke bg-very-light-gray rounded-md w-full placeholder:text-light-gray focus:border-primary"
							/>
						</fieldset>
					)}

					{renderInfoMessage()}
				</div>

				<Button
					className="mt-10"
					variant={!isLoading && selectedMethod ? "primary" : "disabled"}
					onClick={handleRequestOTP}
				>
					{isLoading ? "Verifying" : "Verify"}
				</Button>
			</div>
		</main>
	);
}
