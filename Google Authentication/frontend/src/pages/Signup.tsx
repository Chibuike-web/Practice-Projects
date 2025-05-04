import { useEffect, useState } from "react";
import Email from "../components/Email";
import NameField from "../components/NameField";
import Password from "../components/Password";
import TermsCheckbox from "../components/TermsCheckbox";
import Button from "../components/Button";
import { FormEvent } from "react";
import { useAuth } from "../store/useAuth";

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checked, setChecked] = useState(false);
	const { setAuthenticated } = useAuth();
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		password: "",
		checked: false,
	});

	type FormData = {
		name: string;
		email: string;
		password: string;
		checked: boolean;
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!email || !name || !password || !checked) {
			return;
		}

		const newFormData = { name, email, password, checked };
		setFormData(newFormData);
		auth(newFormData);

		setEmail("");
		setName("");
		setPassword("");
		setChecked(false);
	};

	const auth = async (data: FormData) => {
		try {
			const res = await fetch("http://localhost:1234/validate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			const result = await res.json();
			console.log(result);
			setAuthenticated();
		} catch (error: any) {
			console.error(`Failed to authenticate: ${error.message}`);
		}
	};

	return (
		<div className="max-w-[500px] w-full flex flex-col px-4">
			<div className="flex flex-col gap-[12px] mb-[40px] w-full">
				<h1 className="text-[32px] font-bold text-dark-gray">Sign up</h1>
				<p className="text-dark-gray">
					Let’s get you all set up so you can access your personal account.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full">
				<NameField name={name} setName={setName} />
				<Email email={email} setEmail={setEmail} />
				<Password password={password} setPassword={setPassword} />
				<TermsCheckbox checked={checked} setChecked={setChecked} />
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
	);
}

const GoogleIcon = () => {
	return (
		<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M21.8055 10.5415H21V10.5H12V14.5H17.6515C16.827 16.8285 14.6115 18.5 12 18.5C8.6865 18.5 6 15.8135 6 12.5C6 9.1865 8.6865 6.5 12 6.5C13.5295 6.5 14.921 7.077 15.9805 8.0195L18.809 5.191C17.023 3.5265 14.634 2.5 12 2.5C6.4775 2.5 2 6.9775 2 12.5C2 18.0225 6.4775 22.5 12 22.5C17.5225 22.5 22 18.0225 22 12.5C22 11.8295 21.931 11.175 21.8055 10.5415Z"
				fill="#FFC107"
			/>
			<path
				d="M3.15283 7.8455L6.43833 10.255C7.32733 8.054 9.48033 6.5 11.9998 6.5C13.5293 6.5 14.9208 7.077 15.9803 8.0195L18.8088 5.191C17.0228 3.5265 14.6338 2.5 11.9998 2.5C8.15883 2.5 4.82783 4.6685 3.15283 7.8455Z"
				fill="#FF3D00"
			/>
			<path
				d="M12.0002 22.4999C14.5832 22.4999 16.9302 21.5114 18.7047 19.9039L15.6097 17.2849C14.5719 18.074 13.3039 18.5009 12.0002 18.4999C9.39916 18.4999 7.19066 16.8414 6.35866 14.5269L3.09766 17.0394C4.75266 20.2779 8.11366 22.4999 12.0002 22.4999Z"
				fill="#4CAF50"
			/>
			<path
				d="M21.8055 10.5415H21V10.5H12V14.5H17.6515C17.2571 15.6082 16.5467 16.5766 15.608 17.2855L15.6095 17.2845L18.7045 19.9035C18.4855 20.1025 22 17.5 22 12.5C22 11.8295 21.931 11.175 21.8055 10.5415Z"
				fill="#1976D2"
			/>
		</svg>
	);
};
