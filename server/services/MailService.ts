import { Service } from "./Service";
import { setApiKey, send } from "@sendgrid/mail";

setApiKey(process.env.SENDGRID_KEY);

export class MailService extends Service {
	constructor() {
		super();
	}

	public async sendPasswordReset(recipient: string, token: string) {
		try {
			await send({
				from: "admin@angelin.dev",
				to: recipient,
				subject: "Reset your password",
				text: `You have requested to reset your password`,
				html: `You have requested to reset your password, you can do so here: <a href="http://localhost:3030/password/reset/${token}">http://localhost:3030/password/reset/${token}</a>`,
			});
			return true;
		} catch (error) {
			this.errorlog(error);
			return false;
		}
	}
}
