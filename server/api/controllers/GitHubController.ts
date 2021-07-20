import { Controller } from "./Controller";
import * as inversify from "inversify-express-utils";
import passport from "passport";

@inversify.controller("/api/oauth/github")
export class GitHubController extends Controller {
	constructor() {
		super();
	}

	@inversify.httpGet("/callback", passport.authenticate("github", { scope: ["user:email"] }))
	public callback() {
		return this.redirect("/");
	}

	@inversify.httpGet("/", passport.authenticate("github", { scope: ["user:email"] }))
	public auth() {} // Only middleware is needed *shrug*
}
