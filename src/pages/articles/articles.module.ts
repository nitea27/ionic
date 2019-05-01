import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { ArticlePage } from './article.page';
import { ArticlesPage } from './articles.page';

@NgModule({
	imports: [IonicModule, PipesModule],
	declarations: [
		ArticlesPage,
		ArticlePage
	],
	entryComponents: [
		ArticlesPage,
		ArticlePage
	]
})
export class ArticlesModule {

}