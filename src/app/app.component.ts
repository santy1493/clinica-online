import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  loading = true;

  constructor(
    private router: Router,
    private auth: AuthService,
    private firestore: FirestoreService
    ) {
    this.router.events.subscribe((event: any) => {
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
          }, 1000);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {

    this.auth.authState$.subscribe(res => {
      if(res != null ) {
        this.firestore.obtenerUsuarios(res.email).subscribe(res => {

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

    /*this.user$ = this.auth.authState$.pipe(
      filter(state => state ? true : false)
    );*/

    window.location.reload();
    //this.router.navigate(['/login']);
  }
}
