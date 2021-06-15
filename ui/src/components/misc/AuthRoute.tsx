import { ReactNode } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../contexts/UserContext";

interface Props {
	children: ReactNode;
}

export default function AuthRoute({ children }: Props) {
	const { loggedIn, loading } = useAuth();

	if (loading) {
		return null;
	}

	if (!loggedIn) {
		// make modal state context and fire it here
		return <Redirect to="/" />;
	}

	return children;
}
