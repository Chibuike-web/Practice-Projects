import { create } from "zustand";

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	checked: boolean;
	isVerified: boolean;
	otp?: string;
}

type UserType = {
	user: User | null;
	setUser: (user: User) => void;
};

const useUserStore = create<UserType>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));

export const useUser = () => {
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);

	return {
		user,
		setUser,
	};
};
