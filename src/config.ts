import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';
	public drupalApiUrl = 'http://demo.titaniumtemplates.com/drupal/rest/views/rest_api';

	static firebase = {
		apiKey: 'AIzaSyBrdY5tKX1_oIfLiN8O8VCSViCpjchnBG0',
		authDomain: 'restaurant-backend-bd335.firebaseapp.com',
		databaseURL: 'https://restaurant-backend-bd335.firebaseio.com',
		messagingSenderId: '417880833124'
	};

	static mapsApiKey = 'AIzaSyAJjXGcuV6fiSIxhUfVPYIPyOmcMNqw4Nc';
	static sender_id = '211377410430';
	static oneSignalAppId = '8046df2e-979e-4333-aeae-95a81bbc950e';
	static localBaseUrl = 'assets/restaurant/';

	static remoteBaseUrl = 'https://skounis.s3.amazonaws.com/mobile-apps/restaurant-ionic/';
	static backendless = {
		appId: '37DA4B50-6A41-A157-FF0D-474B488B2300',
		appKey: '582C554B-5ACC-0BAC-FFAE-4ABEF8994000'
	};
	static facebook = {
		apiUrl: 'https://graph.facebook.com/v2.8/',
		pageName: 'edesianyc',
		permanentAccessToken: 'EAAP3RGVwMMIBABlgPPH8ynzMcbqabY6aEDmdNTgeXtRUo18Jf5wmRcpVIfk4ZBoD6WKGzZA32j25UYtj1Q2O11MXKXTBMldFnvs02axn7iPuf7tyZA3NpBTTOXj22sLtsDegPyTO8edvWoZBoCfZBrFu1xuaWXxmHkEoobbtQ8QZDZD'
	};

	static currency: { locale: string, code: string, display: 'symbol' | 'code' } = {
		locale: 'de',
		code: 'EUR',
		display: 'symbol'
	};
}
