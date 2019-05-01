import { Component } from '@angular/core';
import { DataProvider } from '../../services/data/base.data-provider';
import { Marker, Point } from './interfaces';

@Component({
	templateUrl: './google-maps.html'
})
export class GoogleMapsPage {
	public markers: Marker[];
	public origin: Point;
	public zoom: number;

	constructor(private data: DataProvider) {
		this.data.getBusiness().then(business => {
			this.initMarkers(business.map.annotations);
			this.origin = business.map.origin;
			this.zoom = business.map.zoomLevel;
		});
	}

	private initMarkers(annotations): void {
		this.markers = annotations.map(x => ({
			latitude: x.latitude,
			longitude: x.longitude,
			label: x.title
		}));
	}
}