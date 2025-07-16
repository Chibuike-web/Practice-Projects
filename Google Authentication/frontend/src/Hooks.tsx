import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const useLoading = () => {
	const [isLoading, setIsLoading] = useState(false);
	return { isLoading, setIsLoading };
};

export const useUserMiddleware = (id: string) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		const controller = new AbortController();

		async function checkUser() {
			try {
				const res = await fetch(`http://localhost:1234/auth/users/${id}`);
				if (!res.ok) {
					console.log("First one");
					navigate("/signup");
					return;
				}

				const data = await res.json();
				if (!data.user) {
					console.log(data.user);
					navigate("/signup");
					return;
				}

				if (!data.user.isVerified) {
					navigate(`/verify-account/${id}`);
					return;
				}

				setUser(data.user);
			} catch (error) {
				console.log("User check failed", error);
				navigate("/signup");
			}
		}
		checkUser();
		return () => controller.abort();
	}, [id, navigate]);

	return user;
};
