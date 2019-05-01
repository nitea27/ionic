import { Injectable } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DataProvider } from '../../services/data/base.data-provider';

@Injectable()
export class ProductResolver {
	constructor(private data: DataProvider) {
	}

	resolve(navParams: NavParams): Promise<any> {
		let productId = navParams.get('productId');
		let categoryId = navParams.get('categoryId');
		let featuredProductId = navParams.get('featuredProductId');

		if (featuredProductId) {
			return this.data.getFeaturedProduct(featuredProductId);
		}
		return this.data.getProduct(categoryId, productId);
	}
}