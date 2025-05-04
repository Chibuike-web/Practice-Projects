import { Mail } from "lucide-react";

export default function Email({
	email,
	setEmail,
}: {
	email: string;
	setEmail: (value: string) => void;
}) {
	return (
		<fieldset className="flex flex-col gap-[8px]">
			<label className="text-[14px]">Email address</label>
			<div className="w-full relative">
				<Mail className="w-[18px] h-[18px] text-dark-gray absolute left-[14px] top-1/2 -translate-y-1/2" />
				<input
					type="text"
					placeholder="Enter your email address"
					value={email}
					className="text-[14px] pl-[44px] border border-input-stroke py-[14px] pr-[14px] bg-very-light-gray rounded-[6px] w-full placeholder:text-[14px] placeholder:text-light-gray focus:border-primary"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
		</fieldset>
	);
}
