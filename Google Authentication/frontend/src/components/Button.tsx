import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outline";
	className?: string;
}

export default function Button({
	children,
	variant = "primary",
	className,
	...props
}: ButtonProps) {
	const baseStyles = "flex items-center justify-center font-medium w-full rounded-[6px] h-[48px]";

	const variantStyles = {
		primary: "bg-primary text-white",
		outline: "border border-input-stroke text-dark-gray",
	};

	const buttonClass = clsx(baseStyles, variantStyles[variant], className);

	return (
		<button className={buttonClass} {...props}>
			{children}
		</button>
	);
}
