import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FbPostsService } from './fb-posts.service';
import { FbPostPage } from './fb-post.page';

@Component({
	templateUrl: 'fb-posts.html',
	providers: [FbPostsService]
})
export class FbPostsPage implements OnInit {
	private service: FbPostsService;
	private nav: NavController;
	public posts: any[];

	constructor(service: FbPostsService, nav: NavController) {
		this.service = service;
		this.nav = nav;
	}

	ngOnInit(): void {
		this.service.getPosts()
			.subscribe(posts => {
				this.posts = posts;
				console.log(posts);
			});
	}

	public itemTapped(item) {
		this.nav.push(FbPostPage, {
			item: item
		});
	}
}
