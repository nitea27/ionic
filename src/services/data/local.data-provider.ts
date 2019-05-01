import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../config';
import { HttpDataProvider } from './http.data-provider';

@Injectable()
export class LocalDataProvider extends HttpDataProvider {
	protected get categoriesUrl() {
		return Config.localBaseUrl;
	}

	protected get businessUrl() {
		return Config.localBaseUrl;
	}

	protected get featuredUrl() {
		return Config.localBaseUrl;
	}

	protected get newsUrl() {
		return Config.localBaseUrl;
	}

	constructor(http: HttpClient) {
		super(http);
	}
}