import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/models/especialidad';
import { Horario } from 'src/app/models/horario';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioLocal } from 'src/app/models/usuario-local';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalService } from 'src/app/services/local.service';
import { SwalService } from 'src/app/services/swal.service';

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
  especialidades: Especialidad[];
  misHorarios: Horario[];

  inicioLunes: number = null;
  finLunes: number = null;
  inicioMartes: number = null;
  finMartes: number = null;
  inicioMiercoles: number = null;
  finMiercoles: number = null;
  inicioJueves: number = null;
  finJueves: number = null;
  inicioViernes: number = null;
  finViernes: number = null;
  inicioSabado: number = null;
  finSabado: number = null;


  constructor(
    private formBuilder: FormBuilder,
    private firestore: FirestoreService,
    private local: LocalService,
    private swal: SwalService
  ) {}
  
  ngOnInit(): void {

    this.formHorario = this.formBuilder.group({
      especialidad: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      duracionTurno: [],
      trabajaLunes: [false],
      trabajaMartes: [false],
      trabajaMiercoles: [false],
      trabajaJueves: [false],
      trabajaViernes: [false],
      trabajaSabado: [false],
      inicioLunes: [],
      finLunes: [],
      inicioMartes: [],
      finMartes: [],
      inicioMiercoles: [],
      finMiercoles: [],
      inicioJueves: [],
      finJueves: [],
      inicioViernes: [],
      finViernes: [],
      inicioSabado: [],
      finSabado: []
    })

    this.usrLocal = this.local.obtenerUsuario();

    this.firestore.obtenerEspecialidades().subscribe(res => {
      this.especialidades = res;
    });

    this.firestore.obtenerHorariosPorEspecialista(this.usrLocal.email).subscribe(res => {
      this.misHorarios = res;
    })

    /*this.firestore.obtenerHorariosPorEspecialista(this.usrLocal.email).subscribe(horarios => {

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

    });*/
  }


  agregarHorario() {

    const { especialidad, duracionTurno, trabajaLunes, trabajaMartes, trabajaMiercoles,
            trabajaJueves, trabajaViernes, trabajaSabado,
            inicioLunes, finLunes, inicioMartes, finMartes, inicioMiercoles, finMiercoles,
            inicioJueves, finJueves, inicioViernes, finViernes, inicioSabado, finSabado, } = this.formHorario.getRawValue();

      if(!trabajaLunes && !trabajaMartes && !trabajaMiercoles &&
        !trabajaJueves &&  !trabajaViernes && !trabajaSabado) {
          console.log('error');
          return;
        } 

      if( (inicioLunes != null && inicioLunes === finLunes) || (inicioMartes != null && inicioMartes === finMartes) ||
        (inicioMiercoles != null && inicioMiercoles === finMiercoles) || (inicioJueves != null && inicioJueves === finJueves) ||
        (inicioViernes != null && inicioViernes === finViernes) || (inicioSabado != null && inicioSabado === finSabado)) {
          console.log('la hora inicio igual a fin');
          return;
        }

      let horarioRepetido = this.misHorarios.filter(h => h.especialidad === especialidad);

      if(horarioRepetido.length > 0) {
        this.swal.showHorarioRepetido();
        return;
      }

    let lunes: number[];
    let martes: number[];
    let miercoles: number[];
    let jueves: number[];
    let viernes: number[];
    let sabado: number[];

    if(trabajaLunes) {
      lunes = [inicioLunes ? parseInt(inicioLunes) : 10, finLunes ? parseInt(finLunes) : 13];
    }
    if(trabajaMartes) {
      martes = [inicioMartes ? parseInt(inicioMartes) : 10, finMartes ? parseInt(finMartes) : 13];
    }
    if(trabajaMiercoles) {
      miercoles = [inicioMiercoles ? parseInt(inicioMiercoles) : 10, finMiercoles ? parseInt(finMiercoles) : 13];
    }
    if(trabajaJueves) {
      jueves = [inicioJueves ? parseInt(inicioJueves) : 10, finJueves ? parseInt(finJueves) : 13];
    }
    if(trabajaViernes) {
      viernes = [inicioViernes ? parseInt(inicioViernes) : 10, finViernes ? parseInt(finViernes) : 13];
    }
    if(trabajaSabado) {
      sabado = [inicioSabado ? parseInt(inicioSabado) : 10, finSabado ? parseInt(finSabado) : 13];
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


  /*buscarTurnosDisponibles() {

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
  }*/


  /*formatearFecha(date: Date) {
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

  formatLabel(value: number): string {
    return `${value}`;
  }*/


  setearEspecialidadNueva(e: any) {
    console.log(e);
  }


  /*setearInicioLunes(e) {
    this.inicioLunes = e.target.value;
    console.log(this.inicioLunes);
  }
  setearFinLunes(e) {
    this.finLunes = e.target.value;
    console.log(this.finLunes);
  }
  setearInicioMartes(e) {
    this.inicioMartes = e.target.value;
    console.log(this.inicioMartes);
  }
  setearFinMartes(e) {
    this.finMartes = e.target.value;
    console.log(this.finMartes);
  }
  setearInicioMiercoles(e) {
    this.inicioMiercoles = e.target.value;
    console.log(this.inicioMiercoles);
  }
  setearFinMiercoles(e) {
    this.finMiercoles = e.target.value;
    console.log(this.finMiercoles);
  }
  setearInicioJueves(e) {
    this.inicioJueves = e.target.value;
    console.log(this.inicioJueves);
  }
  setearFinJueves(e) {
    this.finJueves = e.target.value;
    console.log(this.finJueves);
  }
  setearInicioViernes(e) {
    this.inicioViernes = e.target.value;
    console.log(this.inicioLunes);
  }
  setearFinViernes(e) {
    this.finViernes = e.target.value;
    console.log(this.inicioLunes);
  }
  setearInicioSabado(e) {
    this.inicioSabado = e.target.value;
    console.log(this.inicioLunes);
  }
  setearFinSabado(e) {
    this.finSabado = e.target.value;
    console.log(this.inicioLunes);
  }*/

}
