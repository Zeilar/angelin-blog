import { useContext } from "react";
import { Redirect } from "react-router";
import { IUserContext, UserContext } from "../contexts";

interface Props {
	children: JSX.Element;
}

export function AuthRoute({ children }: Props) {
	const { loggedIn, loading } = useContext(UserContext) as IUserContext;
	if (loading) return null;
	return loggedIn ? children : <Redirect to="/" />;
}
