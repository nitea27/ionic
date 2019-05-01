import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FacebookApiService } from '../../services/facebook-api.service';
import { EventPage } from './event.page';

@Component({
	selector: 'events',
	templateUrl: './events.page.html'
})
export class EventsPage implements OnInit {
	public events: any[];

	constructor(private service: FacebookApiService, private nav: NavController) {
	}

	ngOnInit(): void {
		this.service.getEvents()
			.subscribe(events => {
				this.events = events;
				console.log(events);
			});
	}

	public itemTapped(item) {
		this.nav.push(EventPage, {
			item: item
		});
	}
}
