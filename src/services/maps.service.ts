import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class MapsService {
	private platform: Platform;

	constructor(platform: Platform) {
		this.platform = platform;
	}

	public openMapsApp(location: any, label: string = null) {
		let q;
		let coords = location.latitude + ',' + location.longitude;

		if (this.platform.is('android')) {
			q = 'geo:' + coords + '?q=' + coords;
			if (label) {
				q += '(' + label + ')';
			}
		} else {
			q = 'maps://maps.apple.com/?q=' + coords;
		}
		window.location.href = q;
	}
}
