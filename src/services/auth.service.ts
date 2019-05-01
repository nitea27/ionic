import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
	private user: firebase.User = null;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe((user: firebase.User) => {
			this.user = user;
		});
	}

	auth(): Observable<boolean> {
		return this.afAuth.authState
			.take(1)
			.flatMap(auth => {
				if (!auth) {
					return Observable.of(false);
				}

				return Observable.of(true);
			});
	}

	getName() {
		return this.user.displayName;
	}

	getEmail() {
		return this.user.email;
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	get id(): string {
		return this.authenticated ? this.user.uid : '';
	}

	signIn(provider: firebase.auth.AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
				.then(() => {
					return this.afAuth.auth.getRedirectResult().then( result => {
						// This gives you a Google Access Token.
						// You can use it to access the Google API.
						let token = result.credential.accessToken;
						// The signed-in user info.
						let user = result.user;
						console.log(token, user);
					}).catch(function(error) {
						// Handle Errors here.
						alert(error.message);
					});
				});
		}
	}

	signInWithGoogle(): Promise<firebase.auth.AuthCredential> {
		return this.signIn(new firebase.auth.GoogleAuthProvider());
	}

	signInWithFacebook(): Promise<firebase.auth.AuthCredential> {
		return this.signIn(new firebase.auth.FacebookAuthProvider());
	}

	signOut(): Promise<any> {
		return this.afAuth.auth.signOut();
	}
}
