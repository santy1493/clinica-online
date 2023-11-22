import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Horario } from 'src/app/models/horario';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioLocal } from 'src/app/models/usuario-local';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-perfil-especialista',
  templateUrl: './perfil-especialista.component.html',
  styleUrls: ['./perfil-especialista.component.css']
})
export class PerfilEspecialistaComponent implements OnInit {
  
  usrLocal: UsuarioLocal;
  especialistas: Usuario[];
  horariosEspecialista: Horario[];
  turnosDisponibles: Turno[] = [];
  turnosAsignados: Turno[] = [];
  especialidadInput: string;
  formHorario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firestore: FirestoreService,
    private local: LocalService
  ) {}
  
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

    this.usrLocal = this.local.obtenerUsuario();

    this.firestore.obtenerHorariosPorEspecialista(this.usrLocal.email).subscribe(horarios => {

      this.horariosEspecialista = horarios;

      this.firestore.obtenerTurnosPorEspecialista(this.usrLocal.email).subscribe(turnos => {

        this.buscarTurnosDisponibles();

        console.log(this.turnosDisponibles);

        turnos.forEach(t => {

          let aux = this.turnosDisponibles.filter(x => x.fecha === t.fecha)

          if(aux.length > 0) {

            aux[0].paciente = 'nodisponible';
          }

        });

      })

    });
  }


  id?: string;
    especialista: string;
    especialidad: string;
    duracionTurno: number;
    semana: [];


  agregarHorario() {

    const { especialidad, duracionTurno, inicioLunes, finLunes, inicioMartes, finMartes,
      inicioMiercoles, finMiercoles, inicioJueves, finJueves, inicioViernes, finViernes, inicioSabado, finSabado } = this.formHorario.getRawValue();

    let lunes: number[];
    let martes: number[];
    let miercoles: number[];
    let jueves: number[];
    let viernes: number[];
    let sabado: number[];

    if(inicioLunes != '') {
      lunes = [inicioLunes, finLunes];
    }
    if(inicioMartes != '') {
      martes = [inicioMartes, finMartes];
    }
    if(inicioMiercoles != '') {
      miercoles = [inicioMiercoles, finMiercoles];
    }
    if(inicioJueves != '') {
      jueves = [inicioJueves, finJueves];
    }
    if(inicioViernes != '') {
      viernes = [inicioViernes, finViernes];
    }
    if(inicioSabado != '') {
      sabado = [inicioSabado, finSabado];
    }

    let horario: Horario = {
      especialista: this.usrLocal.email,
      especialidad: especialidad,
      duracionTurno: 0.5,
      lunes: lunes || null,
      martes: martes || null,
      miercoles: miercoles || null,
      jueves: jueves || null,
      viernes: viernes || null,
      sabado: sabado || null
    }

    this.firestore.agregarHorario(horario);
  }


  buscarTurnosDisponibles() {

    this.turnosDisponibles = [];

    for (let i = 0; i < 14; i++) {
      let diaTurno = new Date();
      diaTurno.setDate(diaTurno.getDate() + i);

      if(diaTurno.getDay() == 1 && this.horariosEspecialista[0].lunes) {
        for(let i = this.horariosEspecialista[0].lunes[0]; i <= this.horariosEspecialista[0].lunes[1]; i+=this.horariosEspecialista[0].duracionTurno) {
          let fechaTurno = new Date(diaTurno);
          fechaTurno.setHours(i, i % 1 == 0 ? 0 : 30, 0);

          let turno: Turno = {
            paciente: '',
            especialista: this.usrLocal.email,
            fecha: fechaTurno.toString(),
            horaInicio: 0,
            horaFin: 0,
            estado: 'pendiente',
            comentarioEspecialista: ''
          } 

          this.turnosDisponibles.push(turno);
        }
      }
      else if(diaTurno.getDay() == 2 && this.horariosEspecialista[0].martes) {
        for(let i = this.horariosEspecialista[0].martes[0]; i <= this.horariosEspecialista[0].martes[1]; i+=this.horariosEspecialista[0].duracionTurno) {
          let fechaTurno = new Date(diaTurno);
          fechaTurno.setHours(i, i % 1 == 0 ? 0 : 30, 0);
          
          let turno: Turno = {
            paciente: '',
            especialista: this.usrLocal.email,
            fecha: fechaTurno.toString(),
            horaInicio: 0,
            horaFin: 0,
            estado: 'pendiente',
            comentarioEspecialista: ''
          } 

          this.turnosDisponibles.push(turno);
        }
      }
      else if(diaTurno.getDay() == 3 && this.horariosEspecialista[0].miercoles) {
        for(let i = this.horariosEspecialista[0].miercoles[0]; i <= this.horariosEspecialista[0].miercoles[1]; i+=this.horariosEspecialista[0].duracionTurno) {
          let fechaTurno = new Date(diaTurno);
          fechaTurno.setHours(i, i % 1 == 0 ? 0 : 30, 0);
          
          let turno: Turno = {
            paciente: '',
            especialista: this.usrLocal.email,
            fecha: fechaTurno.toString(),
            horaInicio: 0,
            horaFin: 0,
            estado: 'pendiente',
            comentarioEspecialista: ''
          } 

          this.turnosDisponibles.push(turno);
        }
      }
      else if(diaTurno.getDay() == 4 && this.horariosEspecialista[0].jueves) {
        for(let i = this.horariosEspecialista[0].jueves[0]; i <= this.horariosEspecialista[0].jueves[1]; i+=this.horariosEspecialista[0].duracionTurno) {
          let fechaTurno = new Date(diaTurno);
          fechaTurno.setHours(i, i % 1 == 0 ? 0 : 30, 0);
          
          let turno: Turno = {
            paciente: '',
            especialista: this.usrLocal.email,
            fecha: fechaTurno.toString(),
            horaInicio: 0,
            horaFin: 0,
            estado: 'pendiente',
            comentarioEspecialista: ''
          } 

          this.turnosDisponibles.push(turno);
        }
      }
      else if(diaTurno.getDay() == 5 && this.horariosEspecialista[0].viernes) {
        for(let i = this.horariosEspecialista[0].viernes[0]; i <= this.horariosEspecialista[0].viernes[1]; i+=this.horariosEspecialista[0].duracionTurno) {
          let fechaTurno = new Date(diaTurno);
          fechaTurno.setHours(i, i % 1 == 0 ? 0 : 30, 0);
          
          let turno: Turno = {
            paciente: '',
            especialista: this.usrLocal.email,
            fecha: fechaTurno.toString(),
            horaInicio: 0,
            horaFin: 0,
            estado: 'pendiente',
            comentarioEspecialista: ''
          } 

          this.turnosDisponibles.push(turno);
        }
      }
      else if(diaTurno.getDay() == 6 && this.horariosEspecialista[0].sabado) {
        for(let i = this.horariosEspecialista[0].sabado[0]; i <= this.horariosEspecialista[0].sabado[1]; i+=this.horariosEspecialista[0].duracionTurno) {
          let fechaTurno = new Date(diaTurno);
          fechaTurno.setHours(i, i % 1 == 0 ? 0 : 30, 0);
          
          let turno: Turno = {
            paciente: '',
            especialista: this.usrLocal.email,
            fecha: fechaTurno.toString(),
            horaInicio: 0,
            horaFin: 0,
            estado: 'pendiente',
            comentarioEspecialista: ''
          } 

          this.turnosDisponibles.push(turno);
        }
      }

    }
  }

  formatearFecha(date: Date) {
    return date.toLocaleString();
  }


  formatDateTime(timespan: string) {
    let date = new Date(parseInt(timespan));
    let fechaHora;
    let fecha = date.toLocaleDateString('en-GB').replace(',', '').replace('/2023', '').replace('/2024', '');
    let hora = date.toLocaleTimeString('en-GB').split(':');
    fechaHora = `${fecha} ${hora[0]}:${hora[1]}`;
    return fechaHora
  }

  formatDateTime1(fecha1: string) {
    let date = new Date(fecha1);
    let fechaHora;
    let fecha = date.toLocaleDateString('en-GB').replace(',', '').replace('/2023', '').replace('/2024', '');
    let hora = date.toLocaleTimeString('en-GB').split(':');
    fechaHora = `${fecha} ${hora[0]}:${hora[1]}`;
    return fechaHora
  }

  asignarTurno(nuevoTurno: Turno){
    nuevoTurno.paciente = 'pacuente1';
    this.firestore.agregarTurno(nuevoTurno);
  }

}
