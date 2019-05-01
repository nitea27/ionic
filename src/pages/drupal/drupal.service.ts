import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../../config';
import { DrupalPost } from './models/drupal-post.model';

@Injectable()
export class DrupalService {
	private config: Config;
	private articles: DrupalPost[];

	constructor(private http: HttpClient, config: Config) {
		this.config = config;
	}

	public getPosts(): Observable<DrupalPost[]> {
		return <Observable<DrupalPost[]>>this.http.get(this.config.drupalApiUrl)
			.map((response: any) => {
				this.articles = response.map((item: any) => this.createArticle(item));
				return this.articles;
			});
	}

	private parseImgSrc(tag): string {
		const match = tag.match(/<img.+src=(?:"|')(.+?)(?:"|')(?:.+?)>/);
		return match[1];
	}

	private createArticle(item): DrupalPost {
		return {
			id: item.nid,
			title: item.node_title,
			brief: item.teaser,
			image: this.parseImgSrc(item.image),
			content: item.body,
			tags: item.tags
		};
	};
}