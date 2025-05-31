import { FormEvent, useState } from "react";
import Button from "../components/Button";
import { VerifyIcon } from "../components/Icons";
import { twMerge } from "tailwind-merge";
import { Check } from "lucide-react";

export default function VerifyAccount() {
	const [selectedMethod, setSelectedMethod] = useState<"email" | "phone" | null>(null);

	const handleSelect = (e: FormEvent, method: "email" | "phone") => {
		e.preventDefault();
		setSelectedMethod((prev) => (prev === method ? null : method));
	};

	const getOptionStyle = (isSelected: boolean) =>
		twMerge(
			"w-full h-12 p-[14px] rounded-md bg-very-light-gray mt-4 flex items-center justify-start",
			isSelected && "border border-primary justify-between"
		);

	return (
		<main className="grid place-items-center h-screen px-4">
			<div className="flex flex-col items-center w-full max-w-[500px]">
				<div className="flex flex-col items-center w-full max-w-[400px]">
					<VerifyIcon />
					<div className="mt-5 w-full text-center">
						<h1 className="font-bold text-2xl tracking-tight">Let's verify your account</h1>
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
				</div>

				<Button
					className="mt-10"
					variant={selectedMethod ? "primary" : "disabled"}
					disabled={!selectedMethod}
				>
					Next
				</Button>
			</div>
		</main>
	);
}
