import { BrowserRouter } from "react-router";

import PageRoutes from "./PageRoutes";

export default function App() {
	return (
		<BrowserRouter>
			<PageRoutes />
		</BrowserRouter>
	);
}
