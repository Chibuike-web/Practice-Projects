import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router";
import VerifyAccount from "./pages/VerifyAccount";
import OneTimePassword from "./pages/OneTimePassword";
import Success from "./pages/Success";

export default function PageRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/signup" replace />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/home/" element={<Home />} />
			<Route path="/verify-account/" element={<VerifyAccount />} />
			<Route path="/otp/" element={<OneTimePassword />} />
			<Route path="/success" element={<Success />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
