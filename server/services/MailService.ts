import { Service } from "./Service";
import { setApiKey, send } from "@sendgrid/mail";

setApiKey(process.env.SENDGRID_KEY);

interface MailArgs {
	from?: string;
	to: string;
	subject: string;
	text: string;
	html: string;
}

export class MailService extends Service {
	constructor() {
		super();
	}

	public async send(args: MailArgs) {
		try {
			await send({
				from: args.from ?? "admin@angelin.dev",
				to: args.to,
				subject: args.subject,
				text: args.text,
				html: args.html,
			});
			return true;
		} catch (error) {
			this.errorlog(error);
			return false;
		}
	}

	public async sendPasswordReset(recipient: string, token: string) {
		return await this.send({
			to: recipient,
			subject: "Reset your password",
			text: `You have requested to reset your password`,
			html: `You have requested to reset your password, you can do so here: <a href="http://blog.angelin.dev/password/reset/${token}">http://localhost:3030/password/reset/${token}</a>`,
		});
	}
}
