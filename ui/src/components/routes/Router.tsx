import { Route, Switch } from "react-router-dom";
import * as Views from "../views";
import { AdminRoute } from "./";
import { Navbar } from "../partials";

export function Router() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route component={Views.Home} path="/" exact />
				<AdminRoute component={Views.CreatePost} path="/post/new" exact />
				<AdminRoute component={Views.EditPost} path="/post/:id-:title?/edit" exact />
				<Route component={Views.SinglePost} path="/post/:id-:title?" exact />
				<AdminRoute component={Views.CreatePost} path="/post/:id-:title?/edit" exact />
				<Route>
					<Views.ErrorPage code={404} />
				</Route>
			</Switch>
		</>
	);
}
