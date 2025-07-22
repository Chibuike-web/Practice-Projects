import { useState, FormEvent } from "react";
import Email from "../components/Email";
import NameField from "../components/NameField";
import Password from "../components/Password";
import TermsCheckbox from "../components/TermsCheckbox";
import Button from "../components/Button";
import { GoogleIcon } from "../components/Icons";
import { validateName, validateEmail, validatePassword, validateCheked } from "../validations";
import { Link, useNavigate } from "react-router";
import { useLoading } from "../Hooks";

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checked, setChecked] = useState(false);
	const [nameError, setNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [checkedError, setCheckedError] = useState("");
	const [registrationError, setRegistrationError] = useState("");
	const { isLoading, setIsLoading } = useLoading();

	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value, checked: isChecked } = e.target;

		switch (id) {
			case "name":
				setName(value);
				if (nameError && value.trim() !== "") setNameError("");
				break;
			case "email":
				setEmail(value);
				if (emailError && value.trim() !== "") setEmailError("");
				break;
			case "password":
				setPassword(value);
				if (passwordError && value.trim() !== "") setPasswordError("");
				break;
			case "checkbox":
				setChecked(isChecked);
				if (checkedError && isChecked) setCheckedError("");
				break;
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const nameErr = validateName(name);
		const emailErr = validateEmail(email);
		const passwordErr = validatePassword(password);
		const checkedErr = validateCheked(checked);
		setNameError(nameErr || "");
		setEmailError(emailErr || "");
		setPasswordError(passwordErr || "");
		setCheckedError(checkedErr || "");

		if (nameErr || emailErr || passwordErr || checkedErr) return;

		const formData = { name, email, password, checked };

		setIsLoading(true);
		try {
			const res = await fetch("http://localhost:1234/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				const data = await res.json();
				if (res.status === 400) {
					setRegistrationError(data.message);
				} else if (res.status === 409) {
					setName("");
					setEmail("");
					setPassword("");
					setChecked(false);
					setRegistrationError(data.message);
					sessionStorage.setItem("user", JSON.stringify(data.user));
					if (!data.user.isVerified) {
						navigate("/verify-account");
					} else {
						navigate("/login");
					}
				}
				throw new Error(data.message || "Registration failed");
			}
			const data = await res.json();

			setRegistrationError("");
			setName("");
			setEmail("");
			setPassword("");
			setChecked(false);
			sessionStorage.setItem("user", JSON.stringify(data.user));
			navigate("/verify-account");
		} catch (error) {
			console.error(`Failed to register: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="h-screen w-screen content-center justify-items-center">
			<section className="max-w-[500px] w-full flex flex-col px-4 md:px-0">
				<div className="flex flex-col gap-[12px] mb-[40px] w-full">
					{registrationError && (
						<div className="mb-4 p-4 bg-yellow-100 text-yellow-800">{registrationError}</div>
					)}
					<h1 className="text-[32px] font-bold text-dark-gray">Sign up</h1>
					<p className="text-dark-gray">
						Let’s get you all set up so you can access your personal account.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full">
					<div>
						<NameField name={name} handleChange={handleChange} error={nameError} />
						{nameError && <p className="text-red-500 mt-[4px]">{nameError}</p>}
					</div>
					<div>
						<Email email={email} handleChange={handleChange} error={emailError} />
						{emailError && <p className="text-red-500 mt-[4px]">{emailError}</p>}
					</div>
					<div>
						<Password password={password} handleChange={handleChange} error={passwordError} />
						{passwordError && <p className="text-red-500 mt-[4px]">{passwordError}</p>}
					</div>
					<div>
						<TermsCheckbox checked={checked} handleChange={handleChange} />
						{checkedError && <p className="text-red-500 mt-[4px]">{checkedError}</p>}
					</div>
					<Button variant="primary" type="submit" className="mt-10">
						{isLoading ? "Signing up..." : "Sign up"}
					</Button>
				</form>

				<div className="flex gap-[4px] justify-center mt-4">
					<p className="text-light-gray">Have an account already?</p>
					<Link to="/login">
						<Button className="text-[1rem] font-medium">Log in</Button>
					</Link>
				</div>

				<div className="flex items-center gap-[16px] text-dark-gray font-medium my-8">
					<span className="w-full bg-dark-gray/25 h-[0.5px] block " />
					OR
					<span className="w-full bg-dark-gray/25 h-[0.5px] block " />
				</div>
				<Button variant="outline" className="gap-4">
					<GoogleIcon /> Sign up with Google
				</Button>
			</section>
		</main>
	);
}
