import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function OAuthSuccess() {
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const userParam = params.get("user");
		if (userParam) {
			try {
				const user = JSON.parse(decodeURIComponent(userParam));
				localStorage.setItem("user", JSON.stringify(user));
			} catch (e) {
				console.error("Failed to parse user from URL:", e);
				localStorage.clear();
			}
		}

		const storedUser = localStorage.getItem("user");
		if (!storedUser) {
			navigate("/signup");
			return;
		}
		navigate("/home");
	}, [navigate]);

	return <div>Loading...</div>;
}
