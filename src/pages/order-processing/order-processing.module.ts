import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomComponentsModule } from '../../components/custom-components.module';
import { DynamicFormModule } from '../../components/forms/dynamic-form.module';
import { PipesModule } from '../../pipes/pipes.module';
import { DeliveryDataCache } from './delivery-data-cache';
import { DeliveryMethodSelectorPage } from './delivery-method-selector.page';
import { DineInPage } from './dine-in.page';
import { HomeDeliveryPage } from './home-delivery.page';
import { OrderProcessor } from './order-processor';
import { TakeAwayPage } from './take-away.page';

@NgModule({
	imports: [IonicModule, PipesModule, CustomComponentsModule, DynamicFormModule, AgmCoreModule, CommonModule],
	declarations: [DeliveryMethodSelectorPage, HomeDeliveryPage, TakeAwayPage, DineInPage],
	entryComponents: [DeliveryMethodSelectorPage, HomeDeliveryPage, TakeAwayPage, DineInPage],
	providers: [OrderProcessor, DeliveryDataCache]
})
export class OrderProcessingModule {

}