import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpDataProvider } from './http.data-provider';

@Injectable()
export class RemoteDataProvider extends HttpDataProvider {
	protected get categoriesUrl() {
		return 'https://skounis.s3.amazonaws.com/mobile-apps/restaurant-ionic/';
	}

	protected get businessUrl() {
		return 'http://appseed.io.s3.amazonaws.com/mobile-apps/restaurant/';
	}

	protected get featuredUrl() {
		return 'https://skounis.s3.amazonaws.com/mobile-apps/restaurant-ionic/';
	}

	protected get newsUrl() {
		return 'https://skounis.s3.amazonaws.com/mobile-apps/restaurant-ionic/';
	}

	constructor(http: HttpClient) {
		super(http);
	}
}