import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomComponentsModule } from '../../components/custom-components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { Cart } from './cart';
import { CartPage } from './cart.page';
import { ChangeQuantityService } from './change-quantity.service';

@NgModule({
	imports: [IonicModule, PipesModule, CustomComponentsModule],
	declarations: [CartPage],
	entryComponents: [CartPage],
	providers: [Cart, ChangeQuantityService]
})
export class CartModule {

}