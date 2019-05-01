export abstract class DataProvider {
	abstract getFeaturedCategories(): Promise<any[]>;
	abstract getCategories(): Promise<any[]>;
	abstract getFeaturedProducts(): Promise<any[]>;
	abstract getProducts(categoryGuid): Promise<any[]>;
	abstract getBusiness(): Promise<any>;
	abstract getFeaturedProduct(productId: string): Promise<any>;
	abstract getProduct(categoryId: string, productId: string): Promise<any>;
	abstract getArticles(): Promise<any[]>;
}