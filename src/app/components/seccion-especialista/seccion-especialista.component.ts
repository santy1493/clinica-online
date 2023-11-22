import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-seccion-especialista',
  templateUrl: './seccion-especialista.component.html',
  styleUrls: ['./seccion-especialista.component.css']
})
export class SeccionEspecialistaComponent implements OnInit {

  especialidadInput: string;
  formHorario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private error: FirebaseErrorService,
    private firestore: FirestoreService,
    private storage: Storage
  ) {

  }

  ngOnInit(): void {
    this.formHorario = this.formBuilder.group({
      especialidad: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      duracionTurno: [''],
      inicioLunes: [''],
      finLunes: [''],
      inicioMartes: [''],
      finMartes: [''],
      inicioMiercoles: [''],
      finMiercoles: [''],
      inicioJueves: [''],
      finJueves: [''],
      inicioViernes: [''],
      finViernes: [''],
      inicioSabado: [''],
      finSabado: ['']
    })
  }


  agregarHorario() {
    
  }

}
