import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/models/historia-clinica';
import { Turno } from 'src/app/models/turno';
import { TurnoCompleto } from 'src/app/models/turno-completo';
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

  pacientes: Usuario[];
  historias: HistoriaClinica[];
  turnosCompletos: TurnoCompleto[];

  constructor(
    private firestore: FirestoreService,
    private local: LocalService
  ) {}
  
  ngOnInit(): void {
    this.usrLocal = this.local.obtenerUsuario();

    this.firestore.obtenerPacientes().subscribe(pac => {
      this.pacientes = pac;

      this.firestore.obtenerEspecialistas().subscribe(esp => {
        this.especialistas = esp;

        this.firestore.obtenerHistoriasClinicas().subscribe(his => {
          this.historias = his;

          this.firestore.obtenerTurnosPorPaciente(this.usrLocal.email).subscribe(res => {
            this.misTurnos = res;

            this.turnosCompletos = [];

            this.misTurnos.forEach(t => {

              const paciente = this.pacientes.filter(p => p.email === t.paciente);
              const especialista = this.especialistas.filter(e => e.email === t.especialista);
              const historia = this.historias.filter(h => h.turno === t.id);

              const turnoCompleto: TurnoCompleto = {
                id: t.id,
                paciente: paciente ? paciente[0] : null,
                especialista: especialista ? especialista[0] : null,
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

            });

          });
        });
      });
    });
  }

  cancelarTurno(turno: TurnoCompleto) {

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
