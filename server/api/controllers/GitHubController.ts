import { Controller } from "./Controller";
import { httpGet, controller } from "inversify-express-utils";
import passport from "passport";

@controller("/api/oauth/github")
export class GitHubController extends Controller {
	constructor() {
		super();
	}

	@httpGet("/callback", passport.authenticate("github", { scope: ["user:email"] }))
	public callback() {
		return this.redirect("/");
	}

	@httpGet("/", passport.authenticate("github", { scope: ["user:email"] }))
	public auth() {} // Only middleware is needed *shrug*
}
