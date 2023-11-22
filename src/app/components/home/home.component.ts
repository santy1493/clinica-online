import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { filter } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService
  ){}

  user: any;
  loading: boolean;

  user$ = this.auth.authState$.pipe(
    filter(state => state ? true : false)
  );
  
  ngOnInit(): void {
    /*this.loading = true;

    this.auth.authState$.subscribe(res => {
      if(res != null ) {
        this.firestore.obtenerUsuario(res.email).subscribe(res => {
          this.user = res[0];
          this.loading = false;
        });
      }
      else {
        this.loading = false;
      }
    });*/

  }

}
