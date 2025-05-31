import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router";
import VerifyAccount from "./pages/VerifyAccount";

export default function PageRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/signup" replace />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/home" element={<Home />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/verify-account" element={<VerifyAccount />} />
		</Routes>
	);
}
