import { useState, useEffect } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import { useLocation, useNavigate } from "react-router";
import { Routes, Route } from "react-router";
import { useAuth } from "./store/useAuth";

export default function App() {
	const { authenticated, setAuthenticated } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (authenticated) {
			navigate("/");
		} else {
			navigate("/signup");
		}
	}, [authenticated, location.pathname, navigate]);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
