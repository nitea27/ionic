import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { EventPage } from './event.page';
import { EventsPage } from './events.page';

@NgModule({
	imports: [IonicModule, PipesModule],
	declarations: [
		EventPage,
		EventsPage
	],
	entryComponents: [
		EventPage,
		EventsPage
	]
})
export class EventsModule {

}