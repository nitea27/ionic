import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FacebookApiService } from '../../services/facebook-api.service';

@Component({
	selector: 'album',
	templateUrl: 'album.page.html'
})
export class AlbumPage implements OnInit {
	pictures: any[];
	album: any;

	constructor(navParams: NavParams, private service: FacebookApiService) {
		this.album = navParams.get('item');
	}

	ngOnInit(): void {
		this.service.getAlbum(this.album.id)
			.subscribe(pictures => {
				this.pictures = pictures;
				console.log(pictures);
			});
	}
}
