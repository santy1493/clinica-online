import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/models/especialidad';
import { Horario } from 'src/app/models/horario';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioLocal } from 'src/app/models/usuario-local';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-agendar-turno',
  templateUrl: './agendar-turno.component.html',
  styleUrls: ['./agendar-turno.component.css']
})
export class AgendarTurnoComponent implements OnInit{

  usrLocal: UsuarioLocal;

  especialidades: Especialidad[];
  horarios: Horario[];
  especialistas: Usuario[];

  especialidadElegida: string = '';
  especialistaElegido: string = '';

  filtroHorarios: Horario[];
  filtroEspecialistas: Usuario[];

  horariosEspecialista: Horario[];
  turnosDisponibles: Turno[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private firestore: FirestoreService,
    private local: LocalService,
    private router: Router
  ) {}
  
  ngOnInit(): void {

    this.usrLocal = this.local.obtenerUsuario();

    this.firestore.obtenerEspecialidades().subscribe(resEspecialidades => {
      this.especialidades = resEspecialidades;

      this.firestore.obtenerHorarios().subscribe(resHorarios => {
        this.horarios = resHorarios;

        this.firestore.obtenerEspecialistas().subscribe(usr => {
          this.especialistas = usr;
    
        });

      });
    });
  }

  elegirEspecialidad(especialidad: Especialidad) {
    this.especialidadElegida = especialidad.nombre;

    this.filtroHorarios = [];

    this.filtroHorarios = this.horarios.filter(x => x.especialidad === this.especialidadElegida);

    this.filtroEspecialistas = [];

    this.filtroHorarios.forEach(h => {

      const auxEspecialista = this.especialistas.filter(x => x.email === h.especialista);

      if(auxEspecialista.length > 0) {

        const auxEspecialistaRepetido = this.filtroEspecialistas.filter(x => x.email === auxEspecialista[0].email);

        if(auxEspecialistaRepetido.length == 0) {
          this.filtroEspecialistas.push(auxEspecialista[0]);
        }
      
      }

    });

  }

  volverEspecialidad() {
    this.especialidadElegida = '';
  }

  elegirEspecialista(especialista: Usuario) {
    this.especialistaElegido = especialista.email;

    this.horariosEspecialista = this.horarios.filter(x => x.especialista === this.especialistaElegido && x.especialidad === this.especialidadElegida);

    this.firestore.obtenerTurnosPorEspecialista(this.especialistaElegido).subscribe(turnos => {

      this.buscarTurnosDisponibles();

      turnos.forEach(t => {

        let aux = this.turnosDisponibles.filter(x => x.fecha === t.fecha)

        if(aux.length > 0) {

          aux[0].paciente = 'nodisponible';
        }

      });

    })

  }

  volverEspecialista() {
    this.especialistaElegido = '';

    this.horariosEspecialista = [];

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
            especialista: this.especialistaElegido,
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
            especialista: this.especialistaElegido,
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
            especialista: this.especialistaElegido,
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
            especialista: this.especialistaElegido,
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
            especialista: this.especialistaElegido,
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
            especialista: this.especialistaElegido,
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
    nuevoTurno.paciente = this.usrLocal.email;
    nuevoTurno.especialidad = this.especialidadElegida;
    this.firestore.agregarTurno(nuevoTurno).then(() => {
      this.router.navigate(['/usuario/paciente']);
    });

  }












}
