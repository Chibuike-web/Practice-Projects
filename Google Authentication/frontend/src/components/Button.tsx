import { Link } from "react-router";
import { cn } from "../utils";
import { ReactNode } from "react";

type ButtonVariants = "text" | "primary" | "outline" | "disabled";

type BaseProps = {
	variant?: ButtonVariants;
	className?: string;
};

type LinkProps = BaseProps & {
	as: "link";
	to: string;
	children: ReactNode;
};

type NativeButtonProps = BaseProps &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		as?: "button";
	};

type ButtonProps = LinkProps | NativeButtonProps;

export default function Button({
	variant = "text",
	as = "button",
	className,

	...props
}: ButtonProps) {
	const baseStyles = "flex items-center justify-center text-sm font-semibold cursor-pointer w-full";

	const variantStyles = {
		primary: "rounded-[6px] h-[48px] bg-primary text-white",
		outline: "rounded-[6px] h-[48px] border border-input-stroke text-dark-gray",
		disabled: "rounded-[6px] h-[48px] bg-primary text-white opacity-25 cursor-not-allowed",
		text: "bg-transparent text-primary ",
	};

	const buttonClass = cn(baseStyles, variantStyles[variant], className);

	const { to, ...linkProps } = props as LinkProps;
	if (as === "link") {
		return <Link to={to} className={buttonClass} {...linkProps} />;
	}

	return <button className={buttonClass} {...props} />;
}
