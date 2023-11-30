import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/models/historia-clinica';
import { PacienteHistoria } from 'src/app/models/paciente-historia';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioLocal } from 'src/app/models/usuario-local';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.css']
})
export class MisPacientesComponent implements OnInit{
  
  loading: boolean = false;
  historiaDetalle: HistoriaClinica = null;

  localUsr: UsuarioLocal;
  historias: HistoriaClinica[];

  pacientes: Usuario[];
  pacientesHistorias: PacienteHistoria[];

  constructor(
    private firestore: FirestoreService,
    private local: LocalService
  ) {}

  ngOnInit(): void {

    this.loading = true;

    this.localUsr = this.local.obtenerUsuario();

    this.firestore.obtenerHistoriasClinicas().subscribe(his => {
      this.historias = his;

      this.firestore.obtenerPacientes().subscribe(pac => {
        this.pacientes = pac;

      const misHistorias = this.historias.filter(h => h.especialista === this.localUsr.email);

      const misPacientes = [];

      misHistorias.forEach(h => {
        if(!misPacientes.includes(h.paciente)) {
          misPacientes.push(h.paciente);
        }
      });

      this.pacientesHistorias = [];

      misPacientes.forEach(p => {

        const pacAux = this.pacientes.filter(x => x.email === p);
        const hisAux = this.historias.filter(x => x.paciente === p);

        const pacienteHistoria: PacienteHistoria = {
          paciente: pacAux[0],
          historias: hisAux
        }

        this.pacientesHistorias.push(pacienteHistoria);
        
      })

      this.loading = false;

      })

    })
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

  openModalDetalle(historia: HistoriaClinica) {
    this.historiaDetalle = historia;
  }

  closeModalDetalle() {
    this.historiaDetalle = null;
  }

}
