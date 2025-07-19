import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "./store/useUserStore";

export const useLoading = () => {
	const [isLoading, setIsLoading] = useState(false);
	return { isLoading, setIsLoading };
};

export const useUserMiddleware = (id: string) => {
	const { user, setUser } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		const storedUser = sessionStorage.getItem("user");
		const parsedUser = storedUser ? JSON.parse(storedUser) : null;

		if (!parsedUser || parsedUser.id !== id) {
			navigate("/signup");
			return;
		}

		setUser(parsedUser);
	}, [id, navigate, setUser]);

	return user;
};
