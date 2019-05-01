import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomComponentsModule } from '../../components/custom-components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { FavoritesPage } from './favorites.page';
import { FavoritesService } from './favorites.service';

@NgModule({
	imports: [IonicModule, PipesModule, CustomComponentsModule],
	declarations: [FavoritesPage],
	entryComponents: [FavoritesPage],
	providers: [FavoritesService]
})
export class FavoritesModule {

}