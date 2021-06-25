import { Redirect } from "react-router";
import { useAuth, useAuthModals } from "../contexts";

interface Props {
	children: JSX.Element;
}

export function AuthRoute({ children }: Props) {
	const { loggedIn, loading } = useAuth();
	const { openModal } = useAuthModals();

	if (loading) return null;

	if (!loggedIn) {
		openModal("login");
		return <Redirect to="/" />;
	}

	return children;
}
