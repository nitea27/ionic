import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

const restaurantCartKey = 'restaurant-cart';

@Injectable()
export class Cart {
	private cart: any[];

	constructor(private ls: LocalStorageService) {
		this.cart = this.ls.retrieve(restaurantCartKey) || [];
	}

	getAll() {
		return this.cart;
	}

	addToCart(cartItem) {
		this.saveToCart(cartItem, cartItem.quantity);
	}

	deleteItem(itemToRemove) {
		this.cart = this.cart.filter(x => x !== itemToRemove);
		this.ls.store(restaurantCartKey, this.cart);
	}

	flush() {
		this.cart = [];
		this.ls.store(restaurantCartKey, this.cart);
	}

	updateQuantity(item, newQuantity: number) {
		item.quantity = newQuantity;
		this.ls.store(restaurantCartKey, this.cart);
	}

	getItemTotal(item) {
		let total = item.price * item.quantity;
		item.options.forEach(option => total += (option.value * item.quantity));
		return total;
	}

	get totalAmount() {
		let total = 0;
		this.cart.forEach(item => total += this.getItemTotal(item));
		return total;
	}


	private saveToCart(cartItem, quantity) {
		cartItem.quantity = quantity;
		this.cart.push(cartItem);

		this.ls.store(restaurantCartKey, this.cart);
	}
}