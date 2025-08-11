import { useEffect, useState } from "react";
import { User } from "./types";
import { useLocation, useNavigate } from "react-router";

export const useLoading = () => {
	const [isLoading, setIsLoading] = useState(false);
	return { isLoading, setIsLoading };
};

export const useUser = (useSession: boolean = false) => {
	const [user, setUser] = useState<User | null>(null);
	const [parsedUser, setParsedUser] = useState<any | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		const storage = useSession ? sessionStorage : localStorage;
		const storedUser = storage.getItem("user");

		if (!storedUser) {
			if (pathname !== "/signup") navigate("/signup");
			setLoading(false);
			return;
		}

		try {
			const parsed = JSON.parse(storedUser);
			setUser(parsed);
			setParsedUser(parsed);

			if (parsed?.isVerified) {
				setLoading(false);
				if (pathname !== "/home") navigate("/home");
				return;
			}
		} catch (err) {
			console.error("Invalid JSON in storage:", err);
		}

		setLoading(false);
	}, [navigate, useSession]);

	return { user, parsedUser, loading };
};
