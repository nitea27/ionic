import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FacebookApiService } from '../../services/facebook-api.service';
import { AlbumPage } from './album.page';

@Component({
	selector: 'albums',
	templateUrl: './albums.page.html'
})
export class AlbumsPage implements OnInit {
	public albums: any[];

	constructor(private fb: FacebookApiService, private nav: NavController) {
	}

	ngOnInit(): void {
		this.fb.getAlbums()
			.subscribe(albums => {
				this.albums = albums;
				console.log(albums);
			});
	}

	public itemTapped(item) {
		this.nav.push(AlbumPage, {
			item: item
		});
	}
}
