import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ChangeQuantityService {
	constructor(private alertController: AlertController) {

	}

	changeQuantity(quantity: number = null): Promise<number> {
		let title;
		let okButton;
		if (quantity) {
			title = 'Update quantity';
			okButton = 'Update';
		} else {
			title = 'Add to cart';
			okButton = 'Add';
			quantity = 1;
		}
		return new Promise(resolve => {
			let alert = this.alertController.create({
				title: title,
				inputs: [
					{
						name: 'quantity',
						placeholder: 'Quantity',
						value: quantity as any,
						min: 1,
						type: 'number'
					}
				],
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel'
					},
					{
						text: okButton,
						handler: data => {
							if (data.quantity > 0) {
								resolve(parseInt(data.quantity, 10));
							} else {
								// invalid login
								return false;
							}
						}
					}
				]
			});
			alert.present();
		});
	}
}
