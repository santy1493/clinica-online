/*import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const usurioActivoGuard: CanActivateFn = (route, state) => {

  let se: AuthService;

  se

  return true;
};
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { emailVerified } from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'root'
})

export class EmailGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | boolean {

    /*return this.auth.authState$?.pipe(
      map((user) => {
        if (user && user.emailVerified) {
          console.log('verificado');
          return true;
        } else {
          console.log('no verificado');
          this.router.navigate(['verificar-email']);
          return false;
        }
      }),
      tap(hasRole => hasRole == false && )
    );*/

    return this.auth.authState$?.pipe(
      map((user) => Boolean(user && user.emailVerified)),
      tap(emailVerified => emailVerified == false && this.router.navigate(['verificar-email']) && console.log('email no verificado'))
    )

  }
}