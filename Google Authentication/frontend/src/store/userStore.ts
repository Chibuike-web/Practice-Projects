import { create } from "zustand";

interface UserType {
	userEmail: string;
	isVerified: boolean;
	setUser: (user: { userEmail: string; isVerified: boolean }) => void;
}

const useUserStore = create<UserType>((set) => ({
	userEmail: "",
	isVerified: false,
	setUser: (user) => set({ ...user }),
}));

export const useUser = () => {
	const userEmail = useUserStore((state) => state.userEmail);
	const isVerified = useUserStore((state) => state.isVerified);
	const setUser = useUserStore((state) => state.setUser);

	return {
		userEmail,
		isVerified,
		setUser,
	};
};
