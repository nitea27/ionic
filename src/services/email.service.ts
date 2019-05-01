import { Injectable } from '@angular/core';

export  class Email {
	to: string;
	subject: string;
	body: string;
}

@Injectable()
export class EmailService {
	sendEmail(email: Email) {
		let plugins: any = window['cordova'].plugins;
		return plugins.email.isAvailable(() => {
			return plugins.email.open(email);
		});
	}
}