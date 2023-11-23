import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioLocal } from 'src/app/models/usuario-local';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-seccion-paciente',
  templateUrl: './seccion-paciente.component.html',
  styleUrls: ['./seccion-paciente.component.css']
})
export class SeccionPacienteComponent implements OnInit{
  
  palabraFiltro: string = '';
  usrLocal: UsuarioLocal;
  misTurnos: Turno[];
  misTurnosFiltrados: Turno[];
  especialistas: Usuario[];

  constructor(
    private firestore: FirestoreService,
    private local: LocalService
  ) {}
  
  ngOnInit(): void {
    this.usrLocal = this.local.obtenerUsuario();

    this.firestore.obtenerEspecialistas().subscribe(usr => {
      this.especialistas = usr;

      this.firestore.obtenerTurnosPorPaciente(this.usrLocal.email).subscribe(res => {
        this.misTurnos = res;
      });

    });
  }

  cancelarTurno(turno: Turno) {

  }

  formatearFecha(fecha: string) {
    let date = new Date(fecha);
    return date.toLocaleDateString('en-GB');
  }

  formatearHora(fecha: string) {
    let date = new Date(fecha);
    let hora = date.toLocaleTimeString('en-GB').split(':');
    return `${hora[0]}:${hora[1]}`;
  }

  formatearEspecialista(email: string) {
    const especialista = this.especialistas.filter(x => x.email === email);
    return `${especialista[0].apellido}, ${especialista[0].nombre}`;
  }

  filtrarTurnos() {
    console.log(this.palabraFiltro);

    if(this.palabraFiltro.length > 2) {
      console.log(this.misTurnos);
      this.misTurnosFiltrados = this.misTurnos.filter(x => x.especialidad?.includes(this.palabraFiltro) || x.especialista?.includes(this.palabraFiltro));
      console.log(this.misTurnosFiltrados);
    }
    else {
      this.misTurnosFiltrados = this.misTurnos;
    }
  }


}
