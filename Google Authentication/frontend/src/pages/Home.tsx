import { useParams } from "react-router";
import { useUserMiddleware } from "../Hooks";

export default function Home() {
	const { id } = useParams();
	if (!id) return null;
	const user = useUserMiddleware(id);

	if (!user) return null;

	return <div>Home</div>;
}
