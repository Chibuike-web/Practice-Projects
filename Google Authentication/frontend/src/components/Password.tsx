import { Lock, EyeOff, EyeIcon } from "lucide-react";
import { useState } from "react";
export default function Password({
	password,
	setPassword,
}: {
	password: string;
	setPassword: (value: string) => void;
}) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<fieldset className="flex flex-col gap-[8px]">
			<label className="text-[14px] font-medium">Password</label>
			<div className="w-full relative">
				<Lock className="w-[18px] h-[18px] text-dark-gray absolute left-[14px] top-1/2 -translate-y-1/2" />
				<input
					type={showPassword ? "text" : "password"}
					placeholder="Enter your password"
					value={password}
					className="text-[14px] px-[44px] border border-input-stroke py-[14px] bg-very-light-gray rounded-[6px] w-full placeholder:text-[14px] placeholder:text-light-gray focus:border-primary"
					onChange={(e) => setPassword(e.target.value)}
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
