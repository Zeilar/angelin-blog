import { Router, Request, Response } from "express";
import passport from "passport";
import { User } from "../../../db/models";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { DB } from "../../../db/utils/DB";
import { ErrorMessages } from "../../utils";

export const router = Router();

type GitHubProfile = Profile & { _json: any };

const { GITHUB_CLIENT, GITHUB_SECRET } = process.env;

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
			profile: GitHubProfile,
			done: (err?: Error | null, profile?: any) => void
		) => {
			let user = await User.query().findOne("github_id", profile.id);

			if (!user) {
				if (await DB.count(User.query().findOne("email", profile._json.email))) {
					return done(new Error(ErrorMessages.EMAIL_TAKEN), null);
				}
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

router.get("/callback", passport.authenticate("github"), (req: Request, res: Response) =>
	res.redirect("/")
);
