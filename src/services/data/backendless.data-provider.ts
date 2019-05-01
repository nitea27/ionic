import { Injectable } from '@angular/core';
import Backendless from 'backendless';
import { Config } from '../../config';
import { DataProvider } from './base.data-provider';

@Injectable()
export class BackendlessDataProvider extends DataProvider {
	constructor() {
		super();

		Backendless.serverURL = 'https://api.backendless.com';
		Backendless.initApp(Config.backendless.appId, Config.backendless.appKey);
	}

	getArticles(): Promise<any[]> {
		return Backendless.Data.of('Article').find()
			.then((items: any[]) => {
				items.forEach((item) => {
					this.adoptItem(item);
				});
				return items;
			});
	}

	getBusiness(): Promise<any> {
		let bPromise = Backendless.Data.of('Business').findFirst();
		let mPromise = Backendless.Data.of('Map').findFirst();

		return Promise.all([bPromise, mPromise]).then((items) => {
			let business: any = items[0];
			let map: any = items[1];

			business.officeLocation = business.officeLocation.latitude + ',' + business.officeLocation.longitude;

			map.annotations.forEach((annotation) => {
				annotation.title = annotation.metadata.city;
			});

			business.map = map;
			business.welcomeImages = business.welcomeImages.map(x => x.url);
			return business;
		});
	}

	getCategories(): Promise<any[]> {
		return Backendless.Data.of('Category').find()
			.then((items: any[]) => {
				items.map(item => {
					this.adoptId(item);
					item.thumb = item.thumb.url;
					item.icon = 'restaurant';
				});
				return items;
			});
	}

	getFeaturedCategories(): Promise<any[]> {
		return this.getCategories().then(items => items.filter(x => x.featured));
	}

	getFeaturedProduct(productId: string): Promise<any> {
		return this.getProduct(null, productId);
	}

	getFeaturedProducts(): Promise<any[]> {
		let queryBuilder = Backendless.DataQueryBuilder.create();
		let whereClause = 'featured = true';
		queryBuilder.setWhereClause(whereClause);

		return Backendless.Data.of('MenuItem').find()
			.then((items: any[]) => {
				items.forEach((item) => {
					this.adoptMenuItem(item);
				});
				return items;
			});
	}

	getProduct(categoryId: string, productId: string): Promise<any> {
		return Backendless.Data.of('MenuItem').findById({ objectId: productId })
			.then((item) => {
				this.adoptMenuItem(item);
				return item;
			});
	}

	getProducts(categoryGuid): Promise<any[]> {
		let queryBuilder = Backendless.DataQueryBuilder.create();
		let whereClause = 'category.objectId = \'' + categoryGuid + '\'';
		queryBuilder.setWhereClause(whereClause);

		return Backendless.Data.of('MenuItem').find()
			.then((items: any[]) => {
				items.forEach(item => {
					this.adoptMenuItem(item);
				});
				return items;
			});
	}

	private adoptMenuItem(item) {
		item.pictures = item.pictures.map(x => x.url);
		item.tags = item.tags.map(x => x.name);
		item.price = item.prices;
		item.thumb = item.thumb.url;

		this.adoptId(item);
	}

	private adoptItem(item) {
		item.thumb = item.thumb.url;
		item.picture = item.picture.url;
		item.tags = item.tags || [];
		this.adoptId(item);
	}

	private adoptId(item) {
		item.guid = item.objectId;
	}
}