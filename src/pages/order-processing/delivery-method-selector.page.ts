import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DineInPage } from './dine-in.page';
import { HomeDeliveryPage } from './home-delivery.page';
import { TakeAwayPage } from './take-away.page';

@Component({
	templateUrl: './delivery-method-selector.html'
})
export class DeliveryMethodSelectorPage {
	constructor(
		private nav: NavController
	) {
	}

	homeDelivery() {
		this.nav.push(HomeDeliveryPage);
	}

	takeAway() {
		this.nav.push(TakeAwayPage);
	}

	dineIn() {
		this.nav.push(DineInPage);
	}
}
