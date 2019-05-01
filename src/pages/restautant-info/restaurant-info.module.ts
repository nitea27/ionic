import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomComponentsModule } from '../../components/custom-components.module';
import { DynamicFormModule } from '../../components/forms/dynamic-form.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ContactUsPage } from './contact-us';

@NgModule({
	imports: [IonicModule, PipesModule, CustomComponentsModule, DynamicFormModule, AgmCoreModule, CommonModule],
	declarations: [ContactUsPage],
	entryComponents: [ContactUsPage],
	providers: []
})
export class RestaurantInfoModule {

}