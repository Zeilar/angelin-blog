import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./views";
import { Helmet } from "react-helmet";

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route component={Home} path="/" exact />
				<Route>
					<Helmet>
						<title>404</title>
					</Helmet>
					<h1>404</h1>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
