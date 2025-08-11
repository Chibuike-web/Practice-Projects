import { useUser } from "../Hooks";

export default function Home() {
	const { user, parsedUser, loading } = useUser();

	if (loading || !user || !parsedUser) return null;
	return <div>Home</div>;
}
