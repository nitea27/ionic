import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { DataProvider } from '../../services/data/base.data-provider';
import { HomePage } from '../home/home.page';

@Component({
	selector: 'welcome',
	templateUrl: './welcome.html'
})
export class WelcomePage {
	public items: any[];

	constructor(data: DataProvider, private nav: NavController, private auth: AuthService) {
		data.getBusiness().then(business => {
			this.items = business.welcomeImages;
		});
	}

	enterTheApp() {
		this.nav.setRoot(HomePage);
	}

	loginWithFacebook() {
		this.auth.signInWithFacebook()
			.then(() => this.postSignIn());
	}

	loginWithGoogle() {
		this.auth.signInWithGoogle()
			.then(() => this.postSignIn());
	}

	private postSignIn(): void {
		this.enterTheApp();
	}
}
