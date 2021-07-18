import { Controller } from "./Controller";
import { Response } from "express";
import * as inversify from "inversify-express-utils";
import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { UserRepository } from "../../repositories";
import { ErrorMessages } from "../utils";
import { User } from "../../db/models";

type GitHubProfile = Profile & { _json: any };

const { GITHUB_CLIENT, GITHUB_SECRET } = process.env;
const userRepository = new UserRepository();

passport.use(
	new GitHubStrategy(
		{
			clientID: GITHUB_CLIENT,
			clientSecret: GITHUB_SECRET,
			callbackURL: "/api/oauth/github/callback",
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: GitHubProfile,
			done: (err: Error | null, profile: GitHubProfile | User | null) => void
		) => {
			if (!profile) return done(new Error(ErrorMessages.DEFAULT), null);

			let user = await userRepository.findOne("github_id", profile.id);

			if (!user) {
				if ((await userRepository.countWhere("email", profile._json.email)) > 0) {
					return done(new Error(ErrorMessages.EMAIL_TAKEN), null);
				}

				user = await userRepository.create({
					email: profile._json.email,
					avatar: profile._json.avatar_url,
					github_id: profile.id,
				});
			}

			done(null, user);
		}
	)
);

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
