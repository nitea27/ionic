import { Injectable } from '@angular/core';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { Config } from '../../config';
import { isCordovaAvailable } from '../../services/is-cordova-available';

@Injectable()
export class OneSignalListenerService {

	constructor(private oneSignal: OneSignal) {
		if (isCordovaAvailable(true)) {
			this.oneSignal.startInit(Config.oneSignalAppId, Config.sender_id);
			this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
			this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
			this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
			this.oneSignal.endInit();
		}
	}

	private onPushReceived(payload: OSNotificationPayload) {
		alert('Push recevied:' + payload.body);
	}

	private onPushOpened(payload: OSNotificationPayload) {
		alert('Push opened: ' + payload.body);
	}
}