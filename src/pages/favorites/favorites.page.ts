import { Component, OnInit } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';
import { ProductPage } from '../menu/product.page';
import { FavoritesService } from './favorites.service';

@Component({
	templateUrl: './favorites.html'
})
export class FavoritesPage {

	items: any[] = [];

	constructor(
		private nav: NavController,
		private toastCtrl: ToastController,
		private favorites: FavoritesService
	) {
	}

	ionViewWillEnter() {
		this.loadItems();
	}

	private loadItems() {
		this.items = this.favorites.getAll();
	}

	remove(item) {
		this.favorites.deleteItem(item.guid);
		this.toastCtrl.create({ message: 'Item removed from cart', duration: 3000 }).present();
		this.loadItems();
	}

	openProduct(item) {
		this.nav.push(ProductPage, {
			productId: item.guid,
			categoryId: item.categoryId
		});
	}
}
