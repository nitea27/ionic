import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { AlbumPage } from './album.page';
import { AlbumsPage } from './albums.page';

@NgModule({
	imports: [IonicModule, PipesModule],
	declarations: [
		AlbumPage,
		AlbumsPage
	],
	entryComponents: [
		AlbumPage,
		AlbumsPage
	]
})
export class AlbumsModule {

}