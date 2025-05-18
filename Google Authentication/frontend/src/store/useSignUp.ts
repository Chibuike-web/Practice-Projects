import { create } from "zustand";

interface SignUpState {
	signUp: boolean;
	setSignUp: () => void;
}

const useSignUpStore = create<SignUpState>((set) => ({
	signUp: false,
	setSignUp: () => set((state) => ({ signUp: !state.signUp })),
}));

export const useSignUp = () => {
	const signUp = useSignUpStore((state) => state.signUp);
	const setSignUp = useSignUpStore((state) => state.setSignUp);

	return { signUp, setSignUp };
};
