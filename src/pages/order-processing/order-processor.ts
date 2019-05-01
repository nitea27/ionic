import { Injectable } from '@angular/core';
import { MoneyPipe } from '../../pipes/money.pipe';
import { EmailService } from '../../services/email.service';
import { isCordovaAvailable } from '../../services/is-cordova-available';

@Injectable()
export class OrderProcessor {
	constructor(private emailService: EmailService, private moneyPipe: MoneyPipe) {
	}

	sendDineInConfirmation(cart, restaurant, destination) {
		let confirmation = 'Table: ' + destination.table + '<br/>';
		if (destination.phone) {
			confirmation += 'Phone number ' + destination.phone + '<br/><br/>';
		}

		confirmation += 'Email ' + destination.email + '<br/><br/>';

		confirmation += '<b>Restaurant info:</b>';
		confirmation += '<br/>';
		confirmation += 'Restaurant name: ' + restaurant.name + '<br/>';
		confirmation += 'Address: ' + restaurant.address + '<br/>';

		confirmation += '<br/>';

		if (destination.notes) {
			confirmation += 'Order Notes ' + destination.notes + '<br/><br/>';
		}

		confirmation += '<b>Items:</b>';
		confirmation += '<br/>';

		confirmation += this.formatItemsList(cart);

		let subject = this.generateSubject();
		return this.sendEmail(restaurant.email, subject, confirmation);
	}

	sendTakeAwayConfirmation(cart, restaurant, destination) {
		let confirmation = '<b>Take Away Order Info:</b>';

		confirmation += 'Fullname: ' + destination.fullname + '<br/>';

		if (destination.email) {
			confirmation += 'Email: ' + destination.email + '<br/>';
		}

		if (destination.phone) {
			confirmation += 'Phone number: ' + destination.phone + '<br/><br/>';
		}

		confirmation += '<b>Restaurant info:</b>';
		confirmation += '<br/>';
		confirmation += 'Restaurant name: ' + restaurant.name + '<br/>';
		confirmation += 'Address: ' + restaurant.address + '<br/>';

		confirmation += '<br/>';
		confirmation += '<b>Items:</b>';
		confirmation += '<br/>';

		confirmation += this.formatItemsList(cart);

		let subject = this.generateSubject();
		return this.sendEmail(restaurant.email, subject, confirmation);
	}

	performHomeDelivery(cart, deliveryData, restaurantEmail) {
		let order = '';

		order += '<b>Delivery info:</b>';
		order += '<br/>';
		order += 'First name: ' + deliveryData.firstName + '<br/>';
		order += 'Last name: ' + deliveryData.lastName + '<br/>';
		order += 'Email: ' + deliveryData.email + '<br/>';
		order += 'Address: ' + deliveryData.address + '<br/>';
		order += 'Zip code: ' + deliveryData.zipCode + '<br/>';
		order += 'Phone number: ' + deliveryData.phoneNumber + '<br/>';
		order += 'City: ' + deliveryData.city + '<br/>';
		order += 'Country: ' + deliveryData.country + '<br/>';

		order += '<br/>';
		order += '<b>Items:</b>';
		order += '<br/>';

		order += this.formatItemsList(cart);

		let subject = this.generateSubject();
		return this.sendEmail(restaurantEmail, subject, order);
	}

	formatItemsList(cart) {
		let order = '';
		let total = 0;
		let currency = '$';
		cart.forEach(item => {
			let itemTotal = item.price * item.quantity;
			currency = item.currency;
			order +=
				item.name + ' ' +
				item.quantity + 'x ' +
				item.size + ' ' +
				this.formatAmount(item.price) + '<br/>';

			if (item.options && item.options.length) {
				order += 'Options:<br/>';
				item.options.forEach((option) => {
					order += '- ' + option.name + ' ' + this.formatAmount(option.value) + '<br/>';
					itemTotal += option.value * item.quantity;
				});
			}
			order += '<b>Item total:</b> ' + this.formatAmount(itemTotal) + '<br/>';
			total += itemTotal;
		});

		order += '<br/>';
		order += 'Total: ' + this.formatAmount(total);
		return order;
	}

	private sendEmail(to, subject, body) {
		if (isCordovaAvailable(true)) {
			return this.emailService.sendEmail({
				body: body,
				subject: subject,
				to: to
			});
		} else {
			console.log('EMAIL client is not available. Printing to the console...');
			console.log(`To: ${to}`);
			console.log(`Subject: ${subject}`);
			console.log(`Body: ${body}`);
			return Promise.resolve();
		}
	}

	private generateSubject() {
		return 'Restaurant Store - Order No ' + Math.floor((Math.random() * 9000) + 1000);
	}

	private formatAmount(amount) {
		return this.moneyPipe.transform(amount);
	}
}
