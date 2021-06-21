import { ReactNode } from "react";
import { Redirect } from "react-router";
import { useAuth, useAuthModals } from "../contexts";

interface Props {
	children: JSX.Element;
}

export function AdminRoute({ children }: Props) {
	const { loggedIn, loading, user } = useAuth();
	const { openModal } = useAuthModals();

	if (loading) return null;

	if (!loggedIn || !user?.is_admin) {
		// make modal state context and fire it here
		openModal("login");
		return <Redirect to="/" />;
	}

	return children;
}
