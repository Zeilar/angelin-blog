import { setApiKey, send } from "@sendgrid/mail";
import { injectable } from "inversify";

setApiKey(process.env.SENDGRID_KEY);

interface MailArgs {
	from?: string;
	to: string;
	subject: string;
	text: string;
	html: string;
}

@injectable()
export class MailService {
	public send(args: MailArgs) {
		send({
			from: args.from ?? "admin@angelin.dev",
			to: args.to,
			subject: args.subject,
			text: args.text,
			html: args.html,
		});
	}

	public sendPasswordReset(recipient: string, token: string) {
		this.send({
			to: recipient,
			subject: "Reset your password",
			text: "You have requested to reset your password",
			html: `You have requested to reset your password, you can do so here: <a href="http://blog.angelin.dev/password/reset/${token}">http://localhost:3030/password/reset/${token}</a>`,
		});
	}
}
