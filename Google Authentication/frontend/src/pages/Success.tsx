import { SuccessIcon } from "../components/Icons";
import Button from "../components/Button";
import { useUser } from "../Hooks";

export default function Success() {
	const { user, parsedUser, loading } = useUser(true);

	if (loading || !user || !parsedUser) return null;
	return (
		<main className="w-full max-w-[500px] mx-auto content-center h-screen justify-items-center ">
			<SuccessIcon />
			<div className="flex flex-col items-center text-center">
				<h1 className="font-bold text-[2rem] tracking-tight mt-[20px] mb-4.5">Account Verified!</h1>
				<p className="text-light-gray leading-snug mb-16">
					Your account has been successfully verified. Enjoy your experience!
				</p>
			</div>
			<Button
				as="link"
				to="/login"
				variant="outline"
				className="border border-primary text-primary"
			>
				Proceed to Login
			</Button>
		</main>
	);
}
