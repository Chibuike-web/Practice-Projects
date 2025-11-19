import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App.tsx";
import SelectContextProvider from "./context/selectContext.tsx";

const queryClient = new QueryClient();
const persister = createAsyncStoragePersister({
	storage: localStorage,
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
			<SelectContextProvider>
				<App />
			</SelectContextProvider>
		</PersistQueryClientProvider>
	</StrictMode>
);
