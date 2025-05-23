import { useState } from "react";
import Email from "../components/Email";
import NameField from "../components/NameField";
import Password from "../components/Password";
import TermsCheckbox from "../components/TermsCheckbox";
import Button from "../components/Button";
import { FormEvent } from "react";
import { GoogleIcon } from "../components/Icons";
import { useSignUp } from "../store/useSignUp";

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checked, setChecked] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({
		name: "",
		email: "",
		password: "",
		checked: "",
	});

	const { setSignUp } = useSignUp();

	interface FormErrors {
		name: string;
		email: string;
		password: string;
		checked: string;
	}

	type FormData = {
		name: string;
		email: string;
		password: string;
		checked: boolean;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value, checked } = e.target;

		if (id === "name") {
			setName(value);
			if (errors.name && value.trim() !== "") {
				setErrors((prev) => ({ ...prev, name: "" }));
			}
		} else if (id === "email") {
			setEmail(value);
			if (errors.email && value.trim() !== "") {
				setErrors((prev) => ({ ...prev, email: "" }));
			}
		} else if (id === "password") {
			setPassword(value);
			if (errors.password && value.trim() !== "") {
				setErrors((prev) => ({ ...prev, password: "" }));
			}
		} else if (id === "checkbox") {
			setChecked(checked);
			if (errors.checked && checked) {
				setErrors((prev) => ({ ...prev, checked: "" }));
			}
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		// Basic Validation
		if (!name) setErrors((prev) => ({ ...prev, name: "Name is required" }));
		if (!email) setErrors((prev) => ({ ...prev, email: "Email is required" }));
		if (!password) setErrors((prev) => ({ ...prev, name: "Password is required" }));
		if (!checked) setErrors((prev) => ({ ...prev, checked: "You must agree to terms" }));

		// Email Validation
		const emailRegex = /^\S+@\S+\.\S+$/;
		if (email.length === 0) {
			setErrors((prev) => ({ ...prev, email: "Email is required" }));
		} else if (!emailRegex.test(email)) {
			setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
		} else if (email.length < 6) {
			setErrors((prev) => ({ ...prev, email: "Email should be minimum 6 characters" }));
		} else if (email.indexOf(" ") >= 0) {
			setErrors((prev) => ({ ...prev, email: "Email cannot contain spaces" }));
		} else {
			setErrors((prev) => ({ ...prev, email: "" }));
		}

		// Password validation
		if (password.length < 8) {
			setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters" }));
		} else {
			setErrors((prev) => ({ ...prev, password: "" }));
		}

		const newFormData = { name, email, password, checked };
		const success = await auth(newFormData);
		if (success) {
			setEmail("");
			setName("");
			setPassword("");
			setChecked(false);
			setErrors({ name: "", email: "", password: "", checked: "" });
			setSignUp();
		}
	};

	const auth = async (formData: FormData) => {
		try {
			const res = await fetch("http://localhost:1234/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok) {
				setErrors(data.errors);
				return false;
			}
			return true;
		} catch (error: any) {
			console.error(`Failed to register: ${error.message}`);
			return false;
		}
	};

	return (
		<section className="h-screen w-screen content-center justify-items-center">
			<div className="max-w-[500px] w-full flex flex-col px-4 md:px-0">
				<div className="flex flex-col gap-[12px] mb-[40px] w-full">
					<h1 className="text-[32px] font-bold text-dark-gray">Sign up</h1>
					<p className="text-dark-gray">
						Let’s get you all set up so you can access your personal account.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full">
					<div>
						<NameField name={name} handleChange={handleChange} error={errors.name} />
						{errors.name && <p className="text-red-500 mt-[4px]">{errors.name}</p>}
					</div>
					<div>
						<Email email={email} handleChange={handleChange} />
						{errors.email && <p className="text-red-500 mt-[4px]">{errors.email}</p>}
					</div>
					<div>
						<Password password={password} handleChange={handleChange} />
						{errors.password && <p className="text-red-500 mt-[4px]">{errors.password}</p>}
					</div>
					<div>
						<TermsCheckbox checked={checked} handleChange={handleChange} />
						{errors.checked && <p className="text-red-500 mt-[4px]">{errors.checked}</p>}
					</div>
					<Button variant="primary" type="submit" className="mt-10">
						Sign up
					</Button>
				</form>

				<div className="flex gap-[4px] justify-center mt-4">
					<p className="text-light-gray">Have an account already?</p>
					<span className="text-primary font-medium">Log in</span>
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
					<GoogleIcon /> Sign up with Google
				</Button>
			</div>
		</section>
	);
}
