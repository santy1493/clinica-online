import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalService } from 'src/app/services/local.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading: boolean = false;
  firebaseError: boolean = false;
  firebaseErrorText: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private error: FirebaseErrorService,
    private firestore: FirestoreService,
    private local: LocalService,
    private swal: SwalService,
  ) { 
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  async login() {
    this.firebaseError = false;
    this.loading = true;

    try {

      if(this.form.valid) {

        const { email, password } = this.form.getRawValue();
        
        const userCred = await this.auth.login(email, password);
        this.local.borrarUsuario();

        if(userCred) {
          const user = userCred.user;
  
          if(user.emailVerified) {
            const usuario = await this.firestore.obtenerUsuario(user.email);
  
            if(usuario.activo) {
              this.local.guardarUsuario(usuario);

              if(usuario.rol === 'admin') {
                this.router.navigate(['/usuario/admin']);
              }
              else if(usuario.rol === 'paciente') {
                this.router.navigate(['/usuario/paciente']);
              }
              else if(usuario.rol === 'especialista') {
                this.router.navigate(['/usuario/paciente']);
              }
            }
            else {
              await this.auth.logout();
              this.swal.showCuentaInactiva();
            }
          }
          else {
            await this.auth.logout();
            this.swal.showVerificarEmail();
          }
        }
      }
    } 
    catch (error) {
      console.log(error.code);
      this.firebaseErrorText = this.error.firebaseError(error.code);
      this.firebaseError = true;
    }
    finally {
      this.form.reset();
      this.loading = false;
    }

  }
  
  
  
  completarLogin(nombre: string) {
    if(this.form.controls['email']) {
      let correo = nombre + '@gmail.com'
      this.form.controls['email'].setValue(correo);
    }
    if(this.form.controls['password']) {
      this.form.controls['password'].setValue('123456');
    }
  }

  completarLogin2(email: string) {
    if(this.form.controls['email']) {
      this.form.controls['email'].setValue(email);
    }
    if(this.form.controls['password']) {
      this.form.controls['password'].setValue('123456');
    }
  }

  completarLogin3(usr: Usuario) {
    if(this.form.controls['email']) {
      this.form.controls['email'].setValue(usr.email);
    }
    if(this.form.controls['password']) {
      this.form.controls['password'].setValue('123456');
    }
  }
}
