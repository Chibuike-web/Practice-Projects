import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useUser } from "./store/useUserStore";

export const useLoading = () => {
	const [isLoading, setIsLoading] = useState(false);
	return { isLoading, setIsLoading };
};

export const useUserMiddleware = (id: string) => {
	const { user, setUser } = useUser();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const controller = new AbortController();

		async function checkUser() {
			try {
				const res = await fetch(`http://localhost:1234/auth/users/${id}`);
				if (!res.ok) {
					navigate("/signup");
					return;
				}

				const data = await res.json();

				if (!data.user) {
					console.log(data.user);
					navigate("/signup");
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
	}, [id, navigate, location.pathname]);

	return user;
};
