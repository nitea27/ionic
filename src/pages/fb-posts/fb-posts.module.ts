import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FbPostPage } from './fb-post.page';
import { FbPostsPage } from './fb-posts.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	imports: [IonicModule, PipesModule],
	declarations: [
		FbPostsPage,
		FbPostPage
	],
	entryComponents: [
		FbPostsPage,
		FbPostPage
	]
})
export class FbPostsModule {

}