import { Route, Switch } from "react-router-dom";
import { Home, SinglePost, CreatePost } from "./views";
import { AdminRoute } from "./misc";
import { Navbar } from "./partials";

export default function Router() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route component={Home} path="/" exact />
				<AdminRoute component={CreatePost} path="/post/new" exact />
				<Route component={SinglePost} path="/post/:id-:title?" exact />
				<AdminRoute component={CreatePost} path="/post/:id-:title?/edit" exact />
				<Route>
					<h1>404</h1>
				</Route>
			</Switch>
		</>
	);
}
