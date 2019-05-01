import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataProvider } from './base.data-provider';

@Injectable()
export abstract class HttpDataProvider extends DataProvider {
	protected abstract categoriesUrl;
	protected abstract newsUrl;
	protected abstract businessUrl;
	protected abstract featuredUrl;

	protected constructor(private http: HttpClient) {
		super();
	}

	getFeaturedCategories(): Promise<any[]> {
		return this.getCategories().then(categories => categories.filter(x => x.featured));
	}

	getCategories(): Promise<any[]> {
		return this.http.get<any>(this.categoriesUrl + 'categories.json')
			.map(response => response.result
				.map(category => {
					let index = category.url.lastIndexOf('/');
					category.url = `${this.categoriesUrl}${category.url.substring(index + 1)}`;
					category.icon = 'restaurant';
					return category;
				})
			)
			.toPromise();
	}

	getFeaturedProducts(): Promise<any[]> {
		return this.http.get<any>(`${this.featuredUrl}featured.json`)
			.map(response => response.result)
			.toPromise();
	}

	getCategory(categoryGuid: string): Promise<any> {
		return this.getCategories().then(categories => categories.find(x => x.guid === categoryGuid));
	}

	getProducts(categoryGuid): Promise<any[]> {
		return this.getCategory(categoryGuid)
			.then(category => category.url)
			.then(url => {
				return this.http.get<any>(url).toPromise().then(response => response.result);
			});
	}

	getBusiness(): Promise<any> {
		return this.http.get<any>(`${this.businessUrl}business.json`).toPromise().then(x => x.result);
	}

	getArticles(): Promise<any> {
		return this.http.get<any>(`${this.newsUrl}news.json`).toPromise().then(x => x.result);
	}

	getFeaturedProduct(productId: string): Promise<any> {
		return this.getFeaturedProducts().then(products => products.find(x => x.guid === productId));
	}

	getProduct(categoryId: string, productId: string): Promise<any> {
		return this.getProducts(categoryId).then(products => products.find(x => x.guid === productId));
	}
}