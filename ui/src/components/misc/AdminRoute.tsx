import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from "../contexts";
import { ComponentType } from "react";

type Props = RouteProps & {
	component: ComponentType<any>;
};

export function AdminRoute({ component: Component, ...rest }: Props) {
	const { loggedIn, loading, user } = useAuth();

	if (loading) return null;

	if (!loggedIn || !user?.is_admin) {
		return <Redirect to="/" />;
	}

	return <Route {...rest} render={props => <Component {...props} />} />;
}
