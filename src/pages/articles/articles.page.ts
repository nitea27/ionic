import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataProvider } from '../../services/data/base.data-provider';
import { ArticlePage } from './article.page';

@Component({
	templateUrl: './articles.html'
})
export class ArticlesPage implements OnInit {
	public posts: any[];

	constructor(private data: DataProvider, private nav: NavController) {
	}

	ngOnInit(): void {
		this.data.getArticles().then(items => {
			this.posts = items;
		});
	}

	public itemTapped(item) {
		this.nav.push(ArticlePage, {
			item: item
		});
	}
}
