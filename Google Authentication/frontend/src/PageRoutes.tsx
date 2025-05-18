import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSignUp } from "./store/useSignUp";

export default function PageRoutes() {
	const { authenticated } = useAuth();
	const { signUp } = useSignUp();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (authenticated) {
			navigate("/");
		} else if (signUp) {
			navigate("/login");
		} else {
			navigate("/signup");
		}
	}, [authenticated, location.pathname, navigate]);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}
