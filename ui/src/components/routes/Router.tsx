import { Route, Switch } from "react-router-dom";
import { Home, SinglePost, CreatePost, EditPost } from "../views";
import { AdminRoute } from "./";
import { Navbar } from "../partials";

export function Router() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route component={Home} path="/" exact />
				<AdminRoute component={CreatePost} path="/post/new" exact />
				<AdminRoute component={EditPost} path="/post/:id-:title?/edit" exact />
				<Route component={SinglePost} path="/post/:id-:title?" exact />
				<AdminRoute component={CreatePost} path="/post/:id-:title?/edit" exact />
				<Route>
					<h1>404</h1>
				</Route>
			</Switch>
		</>
	);
}