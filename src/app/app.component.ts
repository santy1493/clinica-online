import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tp_clinica';

  user$ = this.auth.authState$.pipe(
    filter(state => state ? true : false)
  );

  loading = false;

  constructor(
    private router: Router,
    private auth: AuthService
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
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  async logout() {
    await this.auth.logout();
    window.location.reload();
    //this.router.navigate(['/login']);
  }
}
