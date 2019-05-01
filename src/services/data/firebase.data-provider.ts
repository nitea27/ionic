import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataProvider } from './base.data-provider';

@Injectable()
export class FirebaseDataProvider extends DataProvider {
	constructor(private afDB: AngularFireDatabase) {
		super();
	}

	getArticles(): Promise<any[]> {
		return this.loadItems('news');
	}

	getBusiness(): Promise<any> {
		return this.afDB.object('business').snapshotChanges()
			.map(action => ({ $key: action.key, ...action.payload.val() }))
			.do(item => this.initItem(item))
			.take(1)
			.toPromise();
	}

	getCategories(): Promise<any[]> {
		return this.loadItems('categories').then(items => {
			items.forEach(x => x.icon = 'restaurant');
			return items;
		});
	}

	getFeaturedCategories(): Promise<any[]> {
		return this.getCategories().then(items => {
			return items.filter(x => x.featured);
		});
	}

	getFeaturedProduct(productId: string): Promise<any> {
		return this.getFeaturedProducts().then(items => items.find(x => x.$key === productId));
	}

	getFeaturedProducts(): Promise<any[]> {
		return this.loadItems('menuItems').then(items => {
			return items.filter(x => x.isFeatured);
		});
	}

	getProduct(categoryId: string, productId: string): Promise<any> {
		return this.loadItems('menuItems').then(items => items.find(x => x.guid === productId));
	}

	getProducts(categoryGuid): Promise<any[]> {
		return this.loadItems('menuItems').then(items => items.filter(x => x.category === categoryGuid));
	}

	private loadItems(type: string) {
		return this.afDB.list(type).snapshotChanges()
			.map(actions => actions.map(action => ({ $key: action.key, ...action.payload.val() })))
			.do(items => this.initArray(items))
			.take(1)
			.toPromise();
	}

	private initItem(item) {
		item.guid = item.$key;
	}

	private initArray(array) {
		return array.map(x => this.initItem(x));
	}
}
