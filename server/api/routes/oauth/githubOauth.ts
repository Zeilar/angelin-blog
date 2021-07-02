import { Router, Request, Response } from "express";
import passport from "passport";
import { User } from "../../../db/models";
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from "passport-github2";
import { NumberHelpers } from "../../utils";

export const router = Router();

const { GITHUB_CLIENT, GITHUB_SECRET } = process.env;

passport.serializeUser((user: any, done) => {
	done(null, user);
});

passport.deserializeUser(async (user: User, done) => {
	user = await User.query().findById(user.id);
	done(null, user);
});

passport.use(
	new GitHubStrategy(
		{
			clientID: GITHUB_CLIENT!,
			clientSecret: GITHUB_SECRET!,
			callbackURL: "/api/oauth/github/callback",
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: GitHubProfile & { _json: any },
			done: (err?: Error | null, profile?: any) => void
		) => {
			let user = await User.query().findOne("email", profile._json.email);
			if (!user) {
				user = await User.query().insertAndFetch({
					email: profile._json.email,
					avatar: profile._json.avatar_url,
					oauth: true,
					github_id: profile.id,
				});
			}
			done(null, user);
		}
	)
);

router.get("", passport.authenticate("github"));

router.get(
	"/callback",
	passport.authenticate("github", { failureRedirect: "/?failed=true" }),
	(req: Request, res: Response) => res.redirect("/")
);
