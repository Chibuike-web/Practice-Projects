import { cn } from "../utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "text" | "primary" | "outline" | "disabled";
	className?: string;
}

export default function Button({ variant = "text", className, ...props }: ButtonProps) {
	const baseStyles = "flex items-center justify-center text-sm font-semibold cursor-pointer w-full";

	const variantStyles = {
		primary: "rounded-[6px] h-[48px] bg-primary text-white",
		outline: "rounded-[6px] h-[48px] border border-input-stroke text-dark-gray",
		disabled: "rounded-[6px] h-[48px] bg-primary text-white opacity-25 cursor-not-allowed",
		text: "bg-transparent text-primary ",
	};

	const buttonClass = cn(baseStyles, variantStyles[variant], className);

	return <button className={buttonClass} {...props} />;
}
