import { create } from "zustand";

interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	checked: boolean;
	isVerified: boolean;
}
interface UserType {
	users: User[];
	setUsers: (users: User[]) => void;
	addUser: (user: User) => void;
	updateUser: (id: string, isVerified: boolean) => void;
}

const useUserStore = create<UserType>((set) => ({
	users: [],
	setUsers: (newUsers: User[]) => set({ users: newUsers }),
	addUser: (newUser: User) => set((state) => ({ users: [...state.users, newUser] })),
	updateUser: (id: string, isVerified: boolean) =>
		set((state) => ({ users: state.users.map((u) => (u.id === id ? { ...u, isVerified } : u)) })),
}));

export const useUser = () => {
	const users = useUserStore((state) => state.users);
	const setUsers = useUserStore((state) => state.setUsers);
	const addUser = useUserStore((state) => state.addUser);
	const updateUser = useUserStore((state) => state.updateUser);

	return {
		users,
		setUsers,
		addUser,
		updateUser,
	};
};
