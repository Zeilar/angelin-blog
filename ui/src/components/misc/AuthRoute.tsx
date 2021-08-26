import { Redirect } from "react-router";
import { useUserContext } from "../contexts";

interface Props {
	children: JSX.Element;
}

export function AuthRoute({ children }: Props) {
	const { loggedIn, loading } = useUserContext();
	if (loading) return null;
	return loggedIn ? children : <Redirect to="/" />;
}
