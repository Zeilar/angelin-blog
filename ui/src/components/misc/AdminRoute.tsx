import { Redirect, Route, RouteProps } from "react-router";
import { UserContext } from "../contexts";
import { ComponentType } from "react";
import { useContext } from "react";

type Props = RouteProps & {
	component: ComponentType<any>;
};

export function AdminRoute({ component: Component, ...rest }: Props) {
	const { loggedIn, loading, user } = useContext(UserContext);

	if (loading) return null;

	if (!loggedIn || !user?.is_admin) {
		return <Redirect to="/" />;
	}

	return <Route {...rest} render={props => <Component {...props} />} />;
}
