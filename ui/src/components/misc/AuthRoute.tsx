import { ReactNode } from "react";
import { Redirect } from "react-router";
import { useAuth, useAuthModals } from "../contexts";

interface Props {
	children: ReactNode;
}

export function AuthRoute({ children }: Props) {
	const { loggedIn, loading } = useAuth();
	const { openModal } = useAuthModals();

	if (loading) {
		return null;
	}

	if (!loggedIn) {
		// make modal state context and fire it here
		openModal("login");
		return <Redirect to="/" />;
	}

	return children;
}
