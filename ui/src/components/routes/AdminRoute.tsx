import { Route, RouteProps } from "react-router";
import { useUserContext } from "../contexts";
import { ComponentType } from "react";
import { ErrorPage } from "../views";

type Props = RouteProps & {
	component: ComponentType<any>;
};

export function AdminRoute({ component: Component, ...rest }: Props) {
	const { loggedIn, loading, user } = useUserContext();

	if (loading) return null;

	if (!loggedIn) {
		return <ErrorPage code={401} />;
	} else if (!user?.is_admin) {
		return <ErrorPage code={403} />;
	}

	return <Route {...rest} render={props => <Component {...props} />} />;
}
