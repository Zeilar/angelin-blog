import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, SinglePost, CreatePost } from "./views";
import { Helmet } from "react-helmet";
import { AdminRoute } from "./misc";
import { Navbar } from "./partials";

export default function Router() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route component={Home} path="/" exact />
				<Route component={SinglePost} path="/post/:id/:title?" exact />
				<AdminRoute>
					<Route component={CreatePost} path="/new-post" exact />
				</AdminRoute>
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
