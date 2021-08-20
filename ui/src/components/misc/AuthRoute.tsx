import { useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../contexts";

interface Props {
	children: JSX.Element;
}

export function AuthRoute({ children }: Props) {
	const { loggedIn, loading } = useContext(UserContext);
	if (loading) return null;
	return loggedIn ? children : <Redirect to="/" />;
}
