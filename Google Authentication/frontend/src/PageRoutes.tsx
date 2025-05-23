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
		if (authenticated && location.pathname !== "/") {
			navigate("/", { replace: true });
		} else if (signUp && location.pathname !== "/login") {
			navigate("/login");
		}
	}, [authenticated, signUp, location.pathname, navigate]);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
