import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { AlbumsPage } from '../pages/albums/albums.page';
import { ArticlesPage } from '../pages/articles/articles.page';
import { CartPage } from '../pages/cart/cart.page';
import { DrupalListPage } from '../pages/drupal/list/drupal.list.page';
import { EventsPage } from '../pages/events/events.page';
import { FavoritesPage } from '../pages/favorites/favorites.page';
import { FbPostsPage } from '../pages/fb-posts/fb-posts.page';
import { GoogleMapsPage } from '../pages/google-maps/google-maps.page';
import { HomePage } from '../pages/home/home.page';
import { CategoriesPage } from '../pages/menu/categories.page';
import { ProductsPage } from '../pages/menu/products.page';
import { ContactUsPage } from '../pages/restautant-info/contact-us';
import { WelcomePage } from '../pages/welcome/welcome.page';
import { WordpressListPage } from '../pages/wordpress/list/wordpress.list.page';
import { AuthService } from '../services/auth.service';
import { DataProvider } from '../services/data/base.data-provider';

@Component({
	templateUrl: './app.html'
})
export class MyApp {
	wide: boolean = false;
	genericPages;
	facebookPages;
	otherPages;
	newsPages;
	rootPage;
	categories: any[];

	get isSideMenuEnabled(): boolean {
		return this.nav.getActive() && this.nav.getActive().name !== 'WelcomePage';
	}

	private app;
	private platform;
	private menu: MenuController;

	@ViewChild(Nav) nav: Nav;

	constructor(
		platform: Platform,
		menu: MenuController,
		app: App,
		private statusBar: StatusBar,
		private dataProvider: DataProvider,
		private auth: AuthService
	) {

		this.menu = menu;
		// set up our app
		this.app = app;
		this.platform = platform;
		this.initializeApp();

		// set our app's pages

		this.genericPages = [
			{ title: 'Home', component: HomePage, icon: 'home' },
			{ title: 'Categories', component: CategoriesPage, icon: 'apps' },
			{ title: 'Favorites', component: FavoritesPage, icon: 'star' },
			{ title: 'Cart', component: CartPage, icon: 'cart' }
		];

		this.facebookPages = [
			{ title: 'Events', component: EventsPage, icon: 'calendar' },
			{ title: 'Albums', component: AlbumsPage, icon: 'images' },
			{ title: 'Posts', component: FbPostsPage, icon: 'book' }
		];

		this.otherPages = [
			{ title: 'Contact us', component: ContactUsPage, icon: 'information-circle' },
			{ title: 'Map', component: GoogleMapsPage, icon: 'map' }
		];

		this.newsPages = [
			{ title: 'Articles', component: ArticlesPage, icon: 'paper' },
			{ title: 'Wordpress', component: WordpressListPage, icon: 'logo-wordpress' },
			{ title: 'Drupal', component: DrupalListPage, icon: 'water' }
		];

		this.auth.afAuth.authState.take(1).toPromise().then(state => {
			if (state) {
				this.rootPage = HomePage;
			} else {
				this.rootPage = WelcomePage;
			}
		});

		this.loadCategories();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
		});
	}

	openPage(page) {
		// close the menu when clicking a link from the menu
		this.menu.close();
		// navigate to the new page if it is not the current page
		let component = page.component;
		this.nav.setRoot(component);
	}

	openCategory(category) {
		this.nav.push(ProductsPage, {
			category: category
		});
	}

	logOut() {
		this.nav.setRoot(WelcomePage);
		this.auth.signOut();
	}

	private loadCategories() {
		this.dataProvider.getCategories().then(categories => this.categories = categories);
	}
}
