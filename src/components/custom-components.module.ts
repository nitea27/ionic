import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';
import { NoItemsComponent } from './no-items/no-items.component';
import { TilesComponent } from './tiles/tiles.component';

@NgModule({
	imports: [IonicModule, PipesModule],
	declarations: [TilesComponent, NoItemsComponent],
	exports: [TilesComponent, NoItemsComponent]
})
export class CustomComponentsModule {
}