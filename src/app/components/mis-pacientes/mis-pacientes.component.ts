import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/models/historia-clinica';
import { PacienteHistoria } from 'src/app/models/paciente-historia';
import { TurnoCompleto } from 'src/app/models/turno-completo';
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

  especialista: Usuario;

  pacientes: Usuario[];
  pacientesHistorias: PacienteHistoria[];
  pacientesTurnos: any[];

  turnosCompletos: TurnoCompleto[];
  mostrarTarjeta: boolean = true;

  constructor(
    private firestore: FirestoreService,
    private local: LocalService
  ) {}

  ngOnInit(): void {

    this.loading = true;

    this.localUsr = this.local.obtenerUsuario();

    this.firestore.obtenerEspecialistas().subscribe(esp => {

      this.especialista = esp.filter(e => e.email === this.localUsr.email)[0];

      this.firestore.obtenerTurnosPorEspecialista(this.localUsr.email).subscribe(tur => {

        this.firestore.obtenerHistoriasClinicas().subscribe(his => {
  
          this.firestore.obtenerPacientes().subscribe(pac => {

            const misPacientes = [];

            tur.forEach(t => {
              if(!misPacientes.includes(t.paciente)) {
                misPacientes.push(t.paciente);
              }
            });
  
            this.turnosCompletos = [];
  
            tur.forEach(t => {
  
              const paciente = pac.filter(p => p.email === t.paciente);
              const historia = his.filter(h => h.turno === t.id);
  
              const turnoCompleto: TurnoCompleto = {
                id: t.id,
                paciente: paciente ? paciente[0] : null,
                especialista: this.especialista,
                especialidad: t.especialidad,
                fecha: t.fecha,
                horaInicio: t.horaInicio,
                horaFin: t.horaFin,
                estado: t.estado,
                cancelado: t.cancelado,
                rechazado: t.rechazado,
                finalizado: t.finalizado,
                historia: historia ? historia[0] : null
              }

              this.turnosCompletos.push(turnoCompleto);
  
            })

            console.log(this.turnosCompletos);

            this.pacientesTurnos = [];
            
            misPacientes.forEach(p => {

              const pacAux = pac.filter(x => x.email === p);
              const turAux = this.turnosCompletos.filter(x => x.paciente.email === p && x.especialista.email === this.localUsr.email);
      
              const pacienteTurno: any = {
                paciente: pacAux[0],
                turnos: turAux
              }
      
              this.pacientesTurnos.push(pacienteTurno);
              
            })

            //console.log(this.pacientesTurnos);

            this.loading = false;
  
          })
  
        })
  
      })

    })

    /*this.firestore.obtenerHistoriasClinicas().subscribe(his => {
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
        const hisAux = this.historias.filter(x => x.paciente === p && x.especialista === this.localUsr.email);

        const pacienteHistoria: PacienteHistoria = {
          paciente: pacAux[0],
          historias: hisAux
        }

        this.pacientesHistorias.push(pacienteHistoria);
        
      })

      this.loading = false;

      })

    })*/
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
