import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class FavoritesService {
	private items: any[];

	constructor(private ls: LocalStorageService) {
		this.items = ls.retrieve('favorites') || [];
	}

	deleteItem(guid) {
		this.items = this.items.filter(x => x.guid !== guid);
		this.ls.store('favorites', this.items);
	}

	getAll() {
		return this.items;
	}

	addItem(favoriteItem) {
		this.items.push(favoriteItem);
		this.ls.store('favorites', this.items);
	}

	isInFavorites(guid) {
		return this.items.some(x => x.guid === guid);
	}
}