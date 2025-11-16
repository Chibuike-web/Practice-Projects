import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App.tsx";
import SelectContextProvider from "./context/selectContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<SelectContextProvider>
				<App />
			</SelectContextProvider>
		</QueryClientProvider>
	</StrictMode>
);
