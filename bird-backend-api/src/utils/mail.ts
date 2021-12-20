import * as nodemailer from 'nodemailer';
import smtpTransport = require('nodemailer-smtp-transport');
import env from '../env';

class Mail {

	public static async sendMail(
		to: string,
		subject: string,
		message: string,
		from?: string,
		text?: string
	) {
		return new Promise((resolve, reject) => {
			try {
				const mailOptions : nodemailer.SendMailOptions = {
					from: from || `Bird <${env.MAIL_FROM}>`,
					to,
					subject,
					html: message
				};

				if (text) {
					mailOptions.text = text;
				}

				const transporter = nodemailer.createTransport(smtpTransport({
					host: env.MAIL_HOST,
					port: Number(env.MAIL_PORT),
					secure: !!env.MAIL_SECURE,
					auth: {
						user: env.MAIL_USER,
						pass: env.MAIL_PASSWORD
					},
					tls: { rejectUnauthorized: false }
				}));

				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						reject(error);
					} else {
						resolve(info.response);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default Mail;
