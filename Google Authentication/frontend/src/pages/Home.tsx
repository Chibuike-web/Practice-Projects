import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {
	const navigate = useNavigate();
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (!storedUser) {
			navigate("/signup");
		}
	}, []);
	return <div>Home</div>;
}
