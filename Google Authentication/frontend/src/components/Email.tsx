import { Mail } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Email({
	email,
	handleChange,
	error,
}: {
	email: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error: string;
}) {
	return (
		<fieldset className="flex flex-col gap-[8px]">
			<label className="text-[14px]">Email address</label>
			<div className="w-full relative">
				<Mail className="w-[18px] h-[18px] text-dark-gray absolute left-[14px] top-1/2 -translate-y-1/2" />
				<input
					id="email"
					type="text"
					placeholder="Enter your email address"
					required
					value={email}
					className={twMerge(
						"text-sm pl-11 pr-4 py-3 border",
						error ? "border-red-500" : "border-input-stroke",
						"bg-very-light-gray rounded-md w-full placeholder:text-light-gray focus:border-primary"
					)}
					onChange={(e) => handleChange(e)}
				/>
			</div>
		</fieldset>
	);
}
