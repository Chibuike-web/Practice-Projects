import { create } from "zustand";

interface AuthState {
	authenticated: boolean;
	setAuthenticated: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	authenticated: false,
	setAuthenticated: () => set((state) => ({ authenticated: !state.authenticated })),
}));

export const useAuth = () => {
	const authenticated = useAuthStore((state) => state.authenticated);
	const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

	return { authenticated, setAuthenticated };
};
