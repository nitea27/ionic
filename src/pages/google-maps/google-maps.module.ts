import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { GoogleMapsPage } from './google-maps.page';

@NgModule({
	declarations: [GoogleMapsPage],
	entryComponents: [GoogleMapsPage],
	imports: [IonicModule, AgmCoreModule]
})
export class GoogleMapsModule {

}