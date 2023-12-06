import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { FirestoreService } from './services/firestore.service';
import  {trigger, transition, useAnimation}  from  "@angular/animations";
import  {rotateRoomToTop}  from  "ngx-router-animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:  [
    trigger('rotateRoomToTop',  [ transition('home => login', useAnimation(rotateRoomToTop))])
    ]
})

export class AppComponent implements OnInit {
  
  title = 'tp_clinica';

  user$ = this.auth.authState$.pipe(
    filter(state => state ? true : false)
  );

  user: any;
  esAdmin: boolean = false;
  esPaciente: boolean = false;
  esEspecialista: boolean = false;

  loading = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private firestore: FirestoreService
    ) {
   /* this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.loading = false;
          }, 300);
          break;
        }
        default: {
          break;
        }
      }
    });*/
  }

  ngOnInit(): void {

    this.auth.authState$.subscribe(res => {
      if(res != null ) {
        this.firestore.obtenerUsuarios(res.email).subscribe(res => {

          console.log(res);
          this.esAdmin = false;
          this.esPaciente = false;
          this.esEspecialista = false;

          if(res[0].rol == 'admin') {
            this.esAdmin = true;
          }
          else if(res[0].rol === 'paciente') {
            this.esPaciente = true;
          }
          else if(res[0].rol === 'especialista') {
            this.esEspecialista = true;
          }
          this.loading = false
        });
      }
    });

    /*this.auth.authState$.subscribe(res => {
      if(res != null ) {
        /*this.firestore.obtenerUsuario(res.email).subscribe(res => {
          this.user = res[0];
          if(this.user.rol === 'admin') {
            this.esAdmin = true;
          }
          else if(this.user.rol === 'paciente') {
            this.esPaciente = true;
          }
          else if(this.user.rol === 'especialista') {
            this.esEspecialista = true;
          }
        });
      }
      this.loading = false
    });*/
  }

  async logout() {
    this.esAdmin = false;
    this.esEspecialista = false;
    this.esPaciente = false;
    await this.auth.logout();

    window.location.reload();
    //this.router.navigate(['/login']);
  }

  getState(outlet)  {
		return outlet.activatedRouteData.state;
	}

}
