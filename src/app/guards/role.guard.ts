import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';
import { FirestoreService } from '../services/firestore.service';
import { LocalService } from '../services/local.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
    public firestore: FirestoreService,
    public local: LocalService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | boolean {

    const roles: any[] = next.data?.['roles'];

    const usuario = this.local.obtenerUsuario();

    if(usuario && roles.includes(usuario.rol)) {
      return true;
    }
    
    console.log('sin roles');
    this.router.navigate(['/usuario/' + usuario.rol]);
    return false;

    /*return this.auth.authState$?.pipe(
      map((user) => {
        this.firestore.obtenerUsuario(user.email).subscribe(res => {
          if(res && roles.includes(res[0].rol)) {
            return true;
          }
          this.router.navigate(['sin-roles']);
          return false;
        });
      })
    );*/
  }
}