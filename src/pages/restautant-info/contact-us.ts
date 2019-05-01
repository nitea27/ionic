import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { CallService } from '../../services/call.service';
import { DataProvider } from '../../services/data/base.data-provider';
import { EmailService } from '../../services/email.service';
import { InAppBrowserService } from '../../services/in-app-browser.service';
import { MapsService } from '../../services/maps.service';
import { OpenHoursService } from '../../services/open-hours.service';

@Component({
	selector: 'page-contact-us',
	templateUrl: './contact-us.html'
})
export class ContactUsPage {
	business: any;
	days: any[] = [];

	private openHours = {
		days: [{
			'day': 1, // Monday
			'openAt': 1420095600000, // 9:00
			'closeAt': 1420124400000, // 17:00
		}, {
			'day': 2, // Tuesday
			'openAt': 1420095600000, // 9:00
			'closeAt': 1420110000000, // 13:00
		}, {
			'day': 2, // Tuesday
			'openAt': 1420124400000, // 17:00
			'closeAt': 1420138800000, // 21:00
		}, {
			'day': 3, // Wednesday
			'openAt': 1420095600000, // 9:00
			'closeAt': 1420124400000, // 17:00
		}, {
			'day': 4, // Thursday
			'openAt': 1420095600000, // 9:00
			'closeAt': 1420126300000, // 17:00

		}, {
			'day': 5, // Friday
			'openAt': 1420095600000, // 9:00
			'closeAt': 1420124400000, // 17:00
		}],
		zone: 3 // GMT + 3
	};

	constructor(
		navParams: NavParams,
		private callService: CallService,
		private emailService: EmailService,
		private inBrowser: InAppBrowserService,
		private openHoursService: OpenHoursService,
		private mapsService: MapsService,
		private data: DataProvider
	) {
		this.data.getBusiness().then(business => {
			this.business = business;
			this.days = this.openHoursService.getOpenHours(this.openHours);
		});
	}

	call(phone: string) {
		this.callService.call(phone);
	}

	sendEmail(email: string) {
		this.emailService.sendEmail({ to: email, subject: '', body: '' });
	}

	openUrl(url: string) {
		this.inBrowser.open(url);
	}

	getDirections(officeLocation: string) {
		this.mapsService.openMapsApp(officeLocation, this.business.name);
	}
}
