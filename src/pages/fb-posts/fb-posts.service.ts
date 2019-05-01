import { Injectable } from '@angular/core';
import { FacebookApiService } from '../../services/facebook-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class FbPostsService {
	private facebookApiService: FacebookApiService;

	constructor(facebookApiService: FacebookApiService) {
		this.facebookApiService = facebookApiService
	}

	public getPosts(): Observable<any[]> {
		return this.facebookApiService.getPosts()
			.map(posts => posts.filter(post => post.name));
	}
}