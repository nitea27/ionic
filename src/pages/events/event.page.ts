import { Component, OnInit } from '@angular/core';
import { AlertController, NavParams } from 'ionic-angular';
import { MapsService } from '../../services/maps.service';
import { parse } from 'date-fns';
import { Calendar } from '@ionic-native/calendar';

@Component({
	selector: 'event',
	templateUrl: './event.page.html'
})
export class EventPage implements OnInit {
	event: any;

	constructor(navParams: NavParams, private mapsService: MapsService, private alertCtrl: AlertController, private calendar: Calendar) {
		this.event = navParams.get('item');
	}

	ngOnInit(): void {
	}

	getDirections(location) {
		this.mapsService.openMapsApp(location, this.event.place && this.event.place.name);
	}

	addToCalendar() {
		let place = this.event.place;
		let location: string = null;

		if (place) {
			let loc = place.location;
			location = `${place.name}, ${loc.street}, ${loc.city}, ${loc.zip}, ${loc.country}`;
		}

		let start = this.event.start_time ? parse(this.event.start_time) : null;
		let end = this.event.end_time ? parse(this.event.end_time) : null;

		this.calendar.createEvent(this.event.name, location, this.event.description, start, end)
			.then(
				result => this.notifyEventAdded(),
				error => this.notifyError(error)
			);
	}

	private notifyEventAdded() {
		this.alertCtrl
			.create({
				title: 'Event created',
				subTitle: 'The event successfully created',
				buttons: ['OK']
			})
			.present();
	}

	private notifyError(error: any) {
		console.error(error);
	}
}
