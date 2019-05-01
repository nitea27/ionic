import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';
import { ControlDescriptor } from '../../components/forms/control';
import { ControlBase } from '../../components/forms/control-base';
import { ControlsService } from '../../components/forms/controls.service';
import { DataProvider } from '../../services/data/base.data-provider';
import { Cart } from '../cart/cart';
import { HomePage } from '../home/home.page';
import { DeliveryDataCache } from './delivery-data-cache';
import { OrderProcessor } from './order-processor';

@Component({
	templateUrl: './home-delivery.html'
})
export class HomeDeliveryPage {
	submitted: boolean = false;
	controls: ControlBase<any>[];
	form: FormGroup;

	private descriptors: ControlDescriptor[] = [
		{ type: 'text', name: 'firstName', required: true, title: 'First name' },
		{ type: 'text', name: 'lastName', required: true, title: 'Last name' },
		{ type: 'text', name: 'phoneNumber', required: true, title: 'Phone' },
		{ type: 'text', name: 'email', required: true, title: 'Email', validators: [Validators.email] },
		{ type: 'text', name: 'address', required: true, title: 'Address' },
		{ type: 'text', name: 'zipCode', required: true, title: 'Zip' },
		{ type: 'text', name: 'city', required: true, title: 'City' },
		{ type: 'text', name: 'country', required: true, title: 'Country' }
	];
	private business: any;
	private initialModel: any;

	constructor(
		controlsService: ControlsService,
		private cart: Cart,
		private processor: OrderProcessor,
		data: DataProvider,
		private nav: NavController,
		private deliveryDataCache: DeliveryDataCache,
		private toastr: ToastController
	) {
		this.controls = controlsService.getControls(this.descriptors);
		this.form = new FormGroup({});

		data.getBusiness().then(business => {
			this.business = business;
		});

		this.initialModel = deliveryDataCache.getHomeDeliveryData();
	}

	submit() {
		this.submitted = true;
		if (!this.form.valid) {
			return;
		}

		let cart = this.cart.getAll();
		let deliveryData = this.form.value;

		this.processor.performHomeDelivery(cart, deliveryData, this.business.email).then(() => {
			this.cart.flush();
			this.deliveryDataCache.saveHomeDeliveryData(deliveryData);
			this.nav.setRoot(HomePage);
			this.toastr.create({ message: 'Your order has been submitted', duration: 3000 }).present();
		});
	}
}