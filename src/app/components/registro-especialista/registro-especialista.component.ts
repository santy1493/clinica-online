import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.css']
})
export class RegistroEspecialistaComponent {
  form: FormGroup;
  loading: boolean = false;
  invalidRepeatPass: boolean = false;
  firebaseError: boolean = false;
  firebaseErrorText: string;

  files: Blob[];
  fileUrl: string[];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private error: FirebaseErrorService,
    private firestore: FirestoreService,
    private storage: Storage
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      dni: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(7), Validators.maxLength(8)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(80)]],
      especialidad: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    })
  }

  registrar() {

    const { nombre, apellido, dni, edad, especialidad, email, password, repeatPassword } = this.form.getRawValue();

    if(password !== repeatPassword) {
      this.invalidRepeatPass = true;
      return;
    }

    this.invalidRepeatPass = false;
    this.loading = true;

    this.auth.register(email, password)
    .then(async res => {
      const imgPerfil = await this.uploadImage(res.user.uid);

      let usuario: Usuario = {
        id: res.user.uid,
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        edad: edad,
        especialidad: especialidad,
        email: res.user.email,
        imagenes: imgPerfil,
        rol: 'especialista',
        activo: false
      }
      
      this.firestore.agregarUsuario(usuario);
      this.loading = false;
      this.auth.sendEmailVerification(res);
      this.router.navigate(['home']);
    })
    .catch(error => {
      this.loading = false;
      this.firebaseErrorText = this.error.firebaseError(error.code);
      this.firebaseError = true;
    });
  }


  onSelectFile(e: any) {
    if(e.target.files) {

      this.files = [];
      this.fileUrl = [];

      for (let i = 0; i < e.target.files.length; i++) {

        this.files.push(e.target.files[i]);

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload=(event: any) => {
          this.fileUrl.push(event.target.result);
        }
      }

      console.log(this.fileUrl);

      /*e.target.files.forEach(file => {
        //this.file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(event: any) => {
          this.fileUrl.push(event.target.result);
          console.log(this.fileUrl);
        }
      });*/
      
    }
  }

  base64ToImage(dataURI: string) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return blob;
  }




  async uploadImage(id: string):Promise<string[]> {
    
    if(this.files != null) {
      const url = [];

      for (let i = 0; i < this.files.length; i++) {
        let imgRef = ref(this.storage, `imagenes/perfil/${id}/imagen_${i}`);
        let res = await uploadBytes(imgRef, this.files[i]);
        let urlAux = await getDownloadURL(res.ref);
        url.push(urlAux);
      }

      let obrasociales = ['OSECAC', 'OSPACA', 'OSDE', 'OSCTCP', 'OSCHOCA']

      console.log(url);
      return url;
    }
    
    return null;
  }


}