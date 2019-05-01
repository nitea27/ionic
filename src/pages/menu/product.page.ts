import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Cart } from '../cart/cart';
import { CartPage } from '../cart/cart.page';
import { ChangeQuantityService } from '../cart/change-quantity.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ProductResolver } from './product.resolver';

@Component({
	templateUrl: './product.html',
	selector: 'product-page'
})
export class ProductPage {
	product: any;
	price: any;
	categoryId: string;

	get isInFavorites() {
		return this.favorites.isInFavorites(this.product.guid);
	}

	constructor(
		navParams: NavParams,
		private nav: NavController,
		private cartService: Cart,
		private quantityService: ChangeQuantityService,
		private favorites: FavoritesService,
		private toastr: ToastController,
		private resolver: ProductResolver
	) {
		this.categoryId = navParams.get('categoryId');
		this.resolver.resolve(navParams).then(product => {
			console.log(product);
			this.product = product;
			this.price = product.price[0];
		});
	}

	quickAddToCart() {
		this.pushToCart(1);
		this.toastr.create({ message: 'Item added to cart', duration: 3000 }).present();
	}

	async addToCart() {
		let quantity = await this.quantityService.changeQuantity();
		this.pushToCart(quantity);
		this.toastr.create({ message: 'Item added to cart', duration: 3000 }).present();
	}

	private pushToCart(quantity: number) {
		this.cartService.addToCart({
			quantity: quantity,
			name: this.product.title,
			price: this.price.value,
			size: this.price.name,
			picture: this.product.pictures[0],
			description: this.product.body,
			options: this.getSelectedOptions(this.product.standardOptions).concat(this.getSelectedOptions(this.product.extraOptions))
		});
	}

	toggleFavorites() {
		if (this.isInFavorites) {
			this.favorites.deleteItem(this.product.guid);
			this.toastr.create({ message: this.product.title + ' has been removed from your Favorites', duration: 3000 }).present();
		} else {
			this.favorites.addItem({
				guid: this.product.guid,
				thumb: this.product.thumb,
				name: this.product.title,
				description: this.product.body,
				categoryId: this.categoryId
			});
			this.toastr.create({ message: this.product.title + ' has been added to your Favorites', duration: 3000 }).present();
		}
	}

	openCart() {
		this.nav.push(CartPage);
	}

	private getSelectedOptions(options) {
		return (options || [])
			.filter(x => x.selected)
			.map(option => ({ name: option.name, value: option.value || 0 }));
	}
}
