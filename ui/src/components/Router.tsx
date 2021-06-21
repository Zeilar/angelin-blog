import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, SinglePost, CreatePost } from "./views";
import { Helmet } from "react-helmet";
import { Navbar } from "./partials";
import { AdminRoute } from "./misc";

export default function Router() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route component={Home} path="/" exact />
				<AdminRoute>
					<Route component={CreatePost} path="/post/new" exact />
				</AdminRoute>
				<Route component={SinglePost} path="/post/:id/:title?" exact />
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
