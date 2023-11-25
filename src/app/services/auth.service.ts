import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState, User, NextOrObserver, sendEmailVerification, UserCredential } from '@angular/fire/auth';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$ = authState(this.afAuth); 
  currentUser: User;

  constructor(
    private afAuth: Auth,
    private local: LocalService
  ) { 
    this.currentUser = afAuth.currentUser;
  }

  /*async register(email: string, password: string) {
    const user = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return await signInWithEmailAndPassword(this.afAuth, email, password);
  }*/

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  logout() {
    this.local.borrarUsuario();
    return signOut(this.afAuth);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  sendEmailVerification(userCredential: UserCredential) {
    return sendEmailVerification(userCredential.user);
  }

  /*async getUserEmail(): Promise<string> {

    let userEmail = '';
    
    await this.afAuth.onAuthStateChanged(user => {
      if(user) {
        userEmail = user.email;
      }
    });

    return userEmail;
  }*/
}
