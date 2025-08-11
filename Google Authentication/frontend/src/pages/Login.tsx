import Email from "../components/Email";
import Password from "../components/Password";
import Button from "../components/Button";
import { FormEvent, useState } from "react";
import { GoogleIcon } from "../components/Icons";
import { Link, useNavigate } from "react-router";
import { useLoading } from "../Hooks";

interface FormErrors {
	email: string;
	password: string;
}

interface FormData {
	email: string;
	password: string;
}

export default function Login() {
	const navigate = useNavigate();
	const { isLoading, setIsLoading } = useLoading();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<FormErrors>({
		email: "",
		password: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		switch (id) {
			case "email":
				if (errors.email) {
					setErrors((prev) => ({ ...prev, email: "" }));
				}
				setEmail(value);
				break;
			case "password":
				if (errors.password) {
					setErrors((prev) => ({ ...prev, password: "" }));
				}
				setPassword(value);
				break;
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const formData: FormData = { email, password };
		setIsLoading(true);
		try {
			const res = await fetch("http://localhost:1234/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				const errorData = await res.json();

				if (res.status === 409) {
					alert(errorData.message);
					navigate("/verify-account");
					sessionStorage.setItem("user", JSON.stringify(errorData.user));
					return;
				}
				setErrors(errorData.errors || { email: "", password: "" });
				return;
			}
			const data = await res.json();

			setEmail("");
			setPassword("");
			setErrors({ email: "", password: "" });
			localStorage.setItem("user", JSON.stringify(data.user));
			navigate("/home");
		} catch (error) {
			console.error(`Failed to authenticate: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<section className="h-screen w-screen content-center justify-items-center">
			<div className="max-w-[500px] w-full flex flex-col px-4 md:px-0">
				<div className="flex flex-col gap-[12px] mb-[40px] w-full">
					<h1 className="text-[32px] font-bold text-dark-gray">Log in</h1>
					<p className="text-dark-gray">Login to access your account</p>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full">
					<div>
						<Email email={email} handleChange={handleChange} error={errors.email} />
						{errors.email && <p className="text-red-500 mt-[4px]">{errors.email}</p>}
					</div>
					<div>
						<Password password={password} handleChange={handleChange} error={errors.password} />
						{errors.password && <p className="text-red-500 mt-[4px]">{errors.password}</p>}
					</div>

					<Button
						variant={isLoading ? "disabled" : "primary"}
						type="submit"
						className="mt-10"
						disabled={isLoading}
					>
						{isLoading ? (
							<span className="flex gap-2 items-center justify-center">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Logging in...
							</span>
						) : (
							"Log in"
						)}
					</Button>
				</form>
				<div className="flex gap-[4px] justify-center mt-4">
					<p className="text-light-gray">Don’t have an account?</p>
					<Link to="/signup">
						<button className="text-primary font-medium">Sign up</button>
					</Link>
				</div>

				<div className="flex items-center gap-[16px] text-dark-gray font-medium mb-8 mt-4">
					<span className="w-full bg-dark-gray/25 h-[0.5px] block " />
					OR
					<span className="w-full bg-dark-gray/25 h-[0.5px] block " />
				</div>
				<Button
					variant="outline"
					className="gap-4"
					onClick={() => {
						console.log("hmm");
					}}
				>
					<GoogleIcon /> Log in with Google
				</Button>
			</div>
		</section>
	);
}
