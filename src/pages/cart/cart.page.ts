import { Component, OnInit } from '@angular/core';

import { ItemSliding, NavController, ToastController } from 'ionic-angular';
import { DeliveryMethodSelectorPage } from '../order-processing/delivery-method-selector.page';
import { Cart } from './cart';
import { ChangeQuantityService } from './change-quantity.service';

@Component({
	templateUrl: './cart.html'
})
export class CartPage implements OnInit {

	cartItems: any[] = [];
	total: number = 0;

	constructor(
		public cart: Cart,
		private nav: NavController,
		private quantityService: ChangeQuantityService,
		private toastCtrl: ToastController
	) {
	}

	ngOnInit(): void {
		this.loadCart();
	}

	async changeQuantity(item, slidingItem: ItemSliding) {
		slidingItem.close();
		let newQuantity = await this.quantityService.changeQuantity(item.quantity);
		this.cart.updateQuantity(item, newQuantity);
		this.loadCart();
		this.toastCtrl.create({ message: 'Quantity changed', duration: 3000 }).present();
	}

	remove(item) {
		this.cart.deleteItem(item);
		this.loadCart();
		this.toastCtrl.create({ message: 'Item removed from cart', duration: 3000 }).present();
	}

	pay() {
		this.nav.push(DeliveryMethodSelectorPage);
	}

	private loadCart() {
		this.cartItems = this.cart.getAll();
		this.total = this.cart.totalAmount;
	}
}
