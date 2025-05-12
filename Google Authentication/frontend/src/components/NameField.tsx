import { User } from "lucide-react";

export default function NameField({
	name,
	handleChange,
}: {
	name: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<fieldset className="flex flex-col gap-2">
			<label htmlFor="name" className="text-sm">
				Name
			</label>
			<div className="relative w-full">
				<User
					aria-hidden="true"
					focusable="false"
					className="w-4.5 h-4.5 text-dark-gray absolute left-3.5 top-1/2 -translate-y-1/2"
				/>
				<input
					id="name"
					type="text"
					placeholder="Enter your name"
					value={name}
					required
					onChange={(e) => handleChange(e)}
					className="text-sm pl-11 pr-4 py-3 border border-input-stroke bg-very-light-gray rounded-md w-full placeholder:text-light-gray focus:border-primary"
				/>
			</div>
		</fieldset>
	);
}
