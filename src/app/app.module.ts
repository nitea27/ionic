import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Calendar } from '@ionic-native/calendar';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Ng2Webstorage } from 'ngx-webstorage';
import { CustomComponentsModule } from '../components/custom-components.module';
import { Config } from '../config';
import { AlbumsModule } from '../pages/albums/albums.module';
import { ArticlesModule } from '../pages/articles/articles.module';
import { CartModule } from '../pages/cart/cart.module';
import { ComponentsModule } from '../pages/components/components.module';
import { DrupalModule } from '../pages/drupal/drupal.module';
import { EventsModule } from '../pages/events/events.module';
import { FavoritesModule } from '../pages/favorites/favorites.module';
import { FbPostsModule } from '../pages/fb-posts/fb-posts.module';
import { GoogleMapsModule } from '../pages/google-maps/google-maps.module';
import { HomeModule } from '../pages/home/home.module';
import { MenuModule } from '../pages/menu/menu.module';
import { OrderProcessingModule } from '../pages/order-processing/order-processing.module';
import { OneSignalModule } from '../pages/push/one-signal.module';
import { RestaurantInfoModule } from '../pages/restautant-info/restaurant-info.module';
import { WelcomeModule } from '../pages/welcome/welcome.module';
import { WordpressModule } from '../pages/wordpress/wordpress.module';
import { AuthService } from '../services/auth.service';
import { CallService } from '../services/call.service';
import { DataProvider } from '../services/data/base.data-provider';
import { LocalDataProvider } from '../services/data/local.data-provider';
import { EmailService } from '../services/email.service';
import { FacebookApiService } from '../services/facebook-api.service';
import { InAppBrowserService } from '../services/in-app-browser.service';
import { MapsService } from '../services/maps.service';
import { OpenHoursService } from '../services/open-hours.service';
import { MyApp } from './app.component';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe, 'de');

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		IonicStorageModule.forRoot(),
		IonicModule.forRoot(MyApp),
		AgmCoreModule.forRoot({
			apiKey: Config.mapsApiKey
		}),
		CustomComponentsModule,
		ComponentsModule,
		ArticlesModule,
		DrupalModule,
		HomeModule,
		WelcomeModule,
		WordpressModule,
		GoogleMapsModule,
		MenuModule,
		CartModule,
		OrderProcessingModule,
		Ng2Webstorage,
		FavoritesModule,
		RestaurantInfoModule,
		OneSignalModule,
		EventsModule,
		AlbumsModule,
		FbPostsModule,

		AngularFireModule.initializeApp(Config.firebase),
		AngularFireDatabaseModule,
		AngularFireAuthModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp
	],
	providers: [
		Config,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		StatusBar,
		{ provide: DataProvider, useClass: LocalDataProvider },
		// { provide: DataProvider, useClass: FirebaseDataProvider },
		// { provide: DataProvider, useClass: BackendlessDataProvider },
		// { provide: DataProvider, useClass: RemoteDataProvider },
		EmailService,
		CallService,
		InAppBrowserService,
		MapsService,
		OpenHoursService,
		AuthService,
		FacebookApiService,
		Calendar
	]
})
export class AppModule {
}
