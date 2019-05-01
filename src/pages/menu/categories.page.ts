import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataProvider } from '../../services/data/base.data-provider';
import { ProductsPage } from './products.page';

@Component({
	templateUrl: './categories.html'
})
export class CategoriesPage implements OnInit {

	categories: any[] = [];

	constructor(private data: DataProvider, private nav: NavController) {
	}

	ngOnInit(): void {
		this.data.getCategories().then(categories => this.categories = categories);
	}

	itemTapped(item) {
		this.nav.push(ProductsPage, {
			category: item
		});
	}
}
