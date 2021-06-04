import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Post } from "./views";
import { Helmet } from "react-helmet";
import Navbar from "./partials/Navbar";

export default function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route component={Home} path="/" exact />
				<Route component={Post} path="/post/:id/:title?" exact />
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
