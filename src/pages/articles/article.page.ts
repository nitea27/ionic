import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

@Component({
	templateUrl: './article.html'
})
export class ArticlePage {
	item: any;

	constructor(navParams: NavParams) {
		this.item = navParams.get('item');
	}
}
