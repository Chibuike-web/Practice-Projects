import { useEffect, useState } from "react";
import { User } from "./types";
import { useNavigate } from "react-router";

export const useLoading = () => {
	const [isLoading, setIsLoading] = useState(false);
	return { isLoading, setIsLoading };
};

export const useUser = () => {
	const [user, setUser] = useState<User | null>(null);
	const [parsedUser, setParsedUser] = useState<any | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const storedUser = sessionStorage.getItem("user");
		if (!storedUser) {
			navigate("/signup");
			return;
		}
		const parsedSessionUser = JSON.parse(storedUser);
		setUser(parsedSessionUser);
	}, [navigate]);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			const parsed = JSON.parse(storedUser);
			setParsedUser(parsed);

			if (parsed?.isVerified) {
				navigate("/home");
				return;
			}
		}
		setLoading(false);
	}, [navigate]);

	return { user, parsedUser, loading };
};
