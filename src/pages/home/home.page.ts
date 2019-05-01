import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';
import { DataProvider } from '../../services/data/base.data-provider';
import { GoogleMapsPage } from '../google-maps/google-maps.page';
import { ProductPage } from '../menu/product.page';
import { ProductsPage } from '../menu/products.page';
import { ContactUsPage } from '../restautant-info/contact-us';
import { Tile } from './models/tile.model';

@Component({
	templateUrl: './home.html'
})
export class HomePage {
	tiles: Tile[][] = [];
	products: any[] = [];

	constructor(
		private nav: Nav,
		private data: DataProvider
	) {
		this.loadCategories();
		this.loadProducts();
	}

	navigateTo(tile) {
		this.nav.push(ProductsPage, {
			category: tile.category
		});
	}

	openMap() {
		this.nav.push(GoogleMapsPage);
	}

	contactUs() {
		this.nav.push(ContactUsPage);
	}

	openProduct(product) {
		this.nav.push(ProductPage, {
			featuredProductId: product.guid
		})
	}

	private loadCategories() {
		this.data.getFeaturedCategories()
			.then(categories => {
				let tiles = [];
				let row = [];
				categories.forEach((category, index) => {
					row.push({
						title: category.title,
						thumb: category.thumb,
						icon: category.icon,
						path: category.guid,
						category: category
					});
					if (index % 2 === 1) {
						tiles.push(row);
						row = [];
					}
				});
				if (row.length > 0) {
					tiles.push(row);
				}
				this.tiles = tiles;
			});
	}

	private loadProducts() {
		this.data.getFeaturedProducts()
			.then(products => this.products = products);
	}
}
