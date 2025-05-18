import Email from "../components/Email";
import Password from "../components/Password";
import Button from "../components/Button";
import { FormEvent, useState } from "react";
import { GoogleIcon } from "../components/Icons";
import { useAuth } from "../store/useAuth";

interface FormErrors {
	email: string;
	password: string;
}

interface FormData {
	email: string;
	password: string;
}

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<FormErrors>({
		email: "",
		password: "",
	});
	const { setAuthenticated } = useAuth();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		switch (id) {
			case "email":
				setEmail(value);
				break;
			case "password":
				setPassword(value);
				break;
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const formData: FormData = { email, password };
		try {
			const res = await fetch("http://localhost:1234/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok) {
				setErrors(data.errors || { email: "", password: "" });
			} else {
				console.log(data.message);
				setEmail("");
				setPassword("");
				setErrors({ email: "", password: "" });
				setAuthenticated();
			}
		} catch (error: any) {
			console.error(`Failed to authenticate: ${error.message}`);
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
						<Email email={email} handleChange={handleChange} />
						{errors.email && <p className="text-red-500 mt-[4px]">{errors.email}</p>}
					</div>
					<div>
						<Password password={password} handleChange={handleChange} />
						{errors.password && <p className="text-red-500 mt-[4px]">{errors.password}</p>}
					</div>

					<Button variant="primary" type="submit" className="mt-10">
						Log in
					</Button>
				</form>
				<div className="flex gap-[4px] justify-center mt-4">
					<p className="text-light-gray">Don’t have an account?</p>
					<span className="text-primary font-medium">Sign up</span>
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
