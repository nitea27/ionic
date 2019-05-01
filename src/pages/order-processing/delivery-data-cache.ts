import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class DeliveryDataCache {
	private takeAwayKey = 'take-away-data';
	private dineInKey = 'dine-in-data';
	private homeDeliveryKey = 'home-delivery-data';

	constructor(private ls: LocalStorageService) {

	}

	saveDineInData(data) {
		this.ls.store(this.dineInKey, data);
	}

	saveTakeAwayData(data) {
		this.ls.store(this.takeAwayKey, data);
	}

	saveHomeDeliveryData(data) {
		this.ls.store(this.homeDeliveryKey, data);
	}

	getDineInData() {
		let socialUser = this.ls.retrieve('socialUser');
		let dineIn = this.ls.retrieve(this.dineInKey) || {};
		if (socialUser && !dineIn.email) {
			Object.assign(dineIn, {
				email: socialUser.email
			});
		}
		return dineIn;
	}

	getTakeAwayData() {
		let socialUser = this.ls.retrieve('socialUser');
		let takeAway = this.ls.retrieve(this.takeAwayKey) || {};
		if (socialUser && !takeAway.email) {
			Object.assign(takeAway, {
				email: socialUser.email
			});
		}
		if (socialUser && !takeAway.fullname) {
			Object.assign(takeAway, {
				fullname: this.formatFullName(socialUser)
			});
		}
		return takeAway;
	}

	private formatFullName(socialUser) {
		return ((socialUser.firstName || '') + ' ' + (socialUser.lastName || '')).trim();
	}

	getHomeDeliveryData() {
		let socialUser = this.ls.retrieve('socialUser');
		let homeDelivery = this.ls.retrieve(this.homeDeliveryKey) || {};
		if (socialUser && !homeDelivery.firstName) {
			Object.assign(homeDelivery, {
				firstName: socialUser.firstName
			});
		}
		if (socialUser && !homeDelivery.lastName) {
			Object.assign(homeDelivery, {
				lastName: socialUser.lastName
			});
		}
		if (socialUser && !homeDelivery.email) {
			Object.assign(homeDelivery, {
				email: socialUser.email
			});
		}
		return homeDelivery;
	}
}