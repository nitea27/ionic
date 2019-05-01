import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../services/data/base.data-provider';
import { ProductPage } from './product.page';

@Component({
	templateUrl: './products.html'
})
export class ProductsPage implements OnInit {
	products: any[];
	category: any;

	constructor(private data: DataProvider, private nav: NavController, params: NavParams) {
		this.category = params.get('category');
	}

	ngOnInit(): void {
		this.data.getProducts(this.category.guid).then(products => this.products = products);
	}

	itemTapped(item) {
		this.nav.push(ProductPage, {
			productId: item.guid,
			categoryId: this.category.guid
		});
	}
}
