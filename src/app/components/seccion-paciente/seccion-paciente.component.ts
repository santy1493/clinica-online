import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno';
import { UsuarioLocal } from 'src/app/models/usuario-local';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-seccion-paciente',
  templateUrl: './seccion-paciente.component.html',
  styleUrls: ['./seccion-paciente.component.css']
})
export class SeccionPacienteComponent implements OnInit{
  
  usrLocal: UsuarioLocal;
  misTurnos: Turno[];

  constructor(
    private firestore: FirestoreService,
    private local: LocalService
  ) {}
  
  ngOnInit(): void {
    this.usrLocal = this.local.obtenerUsuario();

    this.firestore.obtenerTurnosPorPaciente(this.usrLocal.email).subscribe(res => {
      this.misTurnos = res;
    });
  }

}
