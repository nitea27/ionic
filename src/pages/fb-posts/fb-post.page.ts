import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { InAppBrowserService } from '../../services/in-app-browser.service';

@Component({
	selector: 'news-item',
	templateUrl: 'fb-post.html'
})
export class FbPostPage {
	picture: string;
	post: any;

	constructor(navParams: NavParams, private inAppBrowser: InAppBrowserService) {
		this.post = navParams.get('item');
	}

	openLink(url: string) {
		this.inAppBrowser.open(url);
	}
}
