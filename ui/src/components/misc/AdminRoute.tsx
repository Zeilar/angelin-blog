import { Redirect, useLocation } from "react-router";
import { useAuth, useAuthModals } from "../contexts";

interface Props {
	children: JSX.Element;
}

export function AdminRoute({ children }: Props) {
	const { loggedIn, loading, user } = useAuth();
	const { openModal } = useAuthModals();
	const location = useLocation();

	if (loading) return null;

	if (!loggedIn || !user?.is_admin) {
		openModal("login");
		return (
			<Redirect
				to={{
					pathname: "/",
					state: { loginPrompt: true, url: location.pathname },
				}}
			/>
		);
	}

	return children;
}