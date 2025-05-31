import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outline" | "disabled";
	className?: string;
}

export default function Button({
	children,
	variant = "primary",
	className,
	...props
}: ButtonProps) {
	const baseStyles =
		"flex items-center justify-center text-sm font-medium cursor-pointer w-full rounded-[6px] h-[48px]";

	const variantStyles = {
		primary: "bg-primary text-white",
		outline: "border border-input-stroke text-dark-gray",
		disabled: "bg-primary text-white opacity-25",
	};

	const buttonClass = twMerge(baseStyles, variantStyles[variant], className);

	return (
		<button className={buttonClass} {...props}>
			{children}
		</button>
	);
}
