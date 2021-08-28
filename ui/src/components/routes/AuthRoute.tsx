import { useUserContext } from "../contexts";
import { ErrorPage } from "../views";

interface Props {
	children: JSX.Element;
}

export function AuthRoute({ children }: Props) {
	const { loggedIn, loading } = useUserContext();
	if (loading) return null;
	return loggedIn ? children : <ErrorPage code={401} />;
}
