import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { WelcomePage } from './welcome.page';

@NgModule({
	imports: [IonicModule],
	declarations: [WelcomePage],
	entryComponents: [WelcomePage]
})
export class WelcomeModule {

}