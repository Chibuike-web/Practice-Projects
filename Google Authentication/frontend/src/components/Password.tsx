import { Lock, EyeOff, EyeIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
export default function Password({
	password,
	handleChange,
	error,
}: {
	password: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error: string;
}) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<fieldset className="flex flex-col gap-[8px]">
			<label className="text-[14px] font-medium">Password</label>
			<div className="w-full relative">
				<Lock className="w-[18px] h-[18px] text-dark-gray absolute left-[14px] top-1/2 -translate-y-1/2" />
				<input
					id="password"
					type={showPassword ? "text" : "password"}
					placeholder="Enter your password"
					value={password}
					required
					className={twMerge(
						"text-sm pl-11 pr-4 py-3 border",
						error !== "" ? "border-red-500" : "border-input-stroke",
						"bg-very-light-gray rounded-md w-full placeholder:text-light-gray focus:border-primary"
					)}
					onChange={(e) => handleChange(e)}
				/>
				{showPassword ? (
					<EyeOff
						className="w-[18px] h-[18px] text-dark-gray absolute right-[14px] top-1/2 -translate-y-1/2"
						onClick={() => {
							setShowPassword((prev) => !prev);
						}}
					/>
				) : (
					<EyeIcon
						className="w-[18px] h-[18px] text-dark-gray absolute right-[14px] top-1/2 -translate-y-1/2"
						onClick={() => {
							setShowPassword((prev) => !prev);
						}}
					/>
				)}
			</div>
		</fieldset>
	);
}
