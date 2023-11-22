import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';
import { FirestoreService } from '../services/firestore.service';
import { user } from '@angular/fire/auth';
import { LocalService } from '../services/local.service';

@Injectable({
  providedIn: 'root'
})

export class ActivoGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
    public firestore: FirestoreService,
    private local: LocalService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | boolean {

    const usuario = this.local.obtenerUsuario();

    if(usuario && usuario.activo) {
      return true;
    }
    
    console.log('no activo');
    this.router.navigate(['/login']);
    return false;

    /*return this.auth.authState$?.pipe(
      map((user) => {
        this.firestore.obtenerUsuario(user.email).subscribe(res => {
          console.log(res);
          if(res && res[0].activo) {
            return true;
          }
          console.log('usuario inactivo');
          this.router.navigate(['usuario-inactivo']);
          return false;
        });
      })
    );*/
    
  }
}