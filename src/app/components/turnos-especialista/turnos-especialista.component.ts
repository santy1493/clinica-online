import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriaClinica } from 'src/app/models/historia-clinica';
import { Turno } from 'src/app/models/turno';
import { TurnoCompleto } from 'src/app/models/turno-completo';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioLocal } from 'src/app/models/usuario-local';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalService } from 'src/app/services/local.service';


@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.css']
})
export class TurnosEspecialistaComponent {
  formFinalizar: FormGroup;
  palabraFiltro: string = '';
  usrLocal: UsuarioLocal;
  misTurnos: Turno[];
  misTurnosFiltrados: Turno[];

  pacientes: Usuario[];
  especialistas: Usuario[];
  historias: HistoriaClinica[];

  turnosCompletos: TurnoCompleto[];

  turnoACancelar: Turno = null;
  comentarioCancelado: string = '';

  turnoARechazar: Turno = null;
  comentarioRechazado: string = '';

  turnoAFinalizar: Turno = null;

  turnoDetalle: TurnoCompleto = null;

  agregarDato1: boolean = false;
  agregarDato2: boolean = false;
  agregarDato3: boolean = false;

  loading: boolean = false;

  constructor(
    private firestore: FirestoreService,
    private local: LocalService,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.loading = true;
    this.usrLocal = this.local.obtenerUsuario();

    this.firestore.obtenerPacientes().subscribe(pac => {
      this.pacientes = pac;

      this.firestore.obtenerEspecialistas().subscribe(esp => {
        this.especialistas = esp;

        this.firestore.obtenerHistoriasClinicas().subscribe(his => {
          this.historias = his;

          this.firestore.obtenerTurnosPorEspecialista(this.usrLocal.email).subscribe(res => {
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

            this.loading = false;

          });
        });
      });
    });

    this.formFinalizar = this.formBuilder.group({
      comentario: ['', [Validators.required]],
      altura: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      temperatura: ['', [Validators.required]],
      presion: ['', [Validators.required]],
      clave1: ['', []],
      valor1: ['', []],
      clave2: ['', []],
      valor2: ['', []],
      clave3: ['', []],
      valor3: ['', []],
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

  formatearEspecialista(email: string) {
    const paciente = this.pacientes.filter(x => x.email === email);
    return `${paciente[0].apellido}, ${paciente[0].nombre}`;
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

  //CANCELAR

  openModalCancelar(turno: TurnoCompleto) {
    const turnoFiltrado = this.misTurnos.filter(t => t.id === turno.id);
    this.turnoACancelar = turnoFiltrado[0];
  }

  closeModalCancelar() {
    this.turnoACancelar = null;
    this.comentarioCancelado = '';
  }

  cancelarTurno() {

    const cancelado = [this.usrLocal.email, this.comentarioCancelado]
    this.firestore.cancelarTurno(this.turnoACancelar, cancelado).then(() => {
      this.turnoACancelar = null;
      this.comentarioCancelado = '';
    })  
    
  }


  //RECHAZAR

  openModalRechazar(turno: TurnoCompleto) {
    const turnoFiltrado = this.misTurnos.filter(t => t.id === turno.id);
    this.turnoARechazar = turnoFiltrado[0];
  }

  closeModalRechazar() {
    this.turnoARechazar = null;
    this.comentarioRechazado = '';
  }

  rechazarTurno() {

    this.firestore.rechazarTurno(this.turnoARechazar, this.comentarioRechazado).then(() => {
      this.turnoARechazar = null;
      this.comentarioRechazado = '';
    })  
    
  }

  //ACEPTAR

  aceptarTurno(turno: TurnoCompleto) {
    console.log(turno);
    const turnoFiltrado = this.misTurnos.filter(t => t.id === turno.id);
    console.log(turnoFiltrado);
    this.firestore.aceptarTurno(turnoFiltrado[0]);
  }

  //FINALIZAR

  openModalFinalizar(turno: TurnoCompleto) {
    const turnoFiltrado = this.misTurnos.filter(t => t.id === turno.id);
    this.turnoAFinalizar = turnoFiltrado[0];
  }

  closeModalFinalizar() {
    this.turnoAFinalizar = null;
    this.formFinalizar.reset();
  }

  finalizarTurno() {

    const { comentario, altura, peso, temperatura, presion, clave1, valor1, clave2, valor2, clave3, valor3  } = this.formFinalizar.getRawValue();

    let fecha = new Date();

    let historiaClinica: HistoriaClinica = {
      turno: this.turnoAFinalizar.id,
      paciente: this.turnoAFinalizar.paciente,
      especialista: this.turnoAFinalizar.especialista,
      especialidad: this.turnoAFinalizar.especialidad,
      fecha: this.turnoAFinalizar.fecha,
      altura: parseInt(altura),
      peso: parseInt(peso),
      temperatura: parseInt(temperatura),
      presion: parseInt(presion),
      clave1: clave1 ? clave1 : null,
      valor1: valor1 ? parseInt(valor1) : null,
      clave2: clave2 ? clave2 : null,
      valor2: valor2 ? parseInt(valor2) : null,
      clave3: clave3 ? clave3 : null,
      valor3: valor3 ? parseInt(valor3) : null,
    }

    this.firestore.finalizarTurno(this.turnoAFinalizar, comentario).then(() => {
      this.firestore.agregarHistoriaClinica(historiaClinica).then(() => {
        this.turnoAFinalizar = null;
        this.formFinalizar.reset();
      })
    })

  }



  agregarDato1Click() {
    this.agregarDato1 = true;
    this.formFinalizar.controls['clave1'].addValidators(Validators.required);
    this.formFinalizar.controls['valor1'].addValidators(Validators.required);
  }

  agregarDato2Click() {
    this.agregarDato2 = true;
    this.formFinalizar.controls['clave2'].addValidators(Validators.required);
    this.formFinalizar.controls['valor2'].addValidators(Validators.required);
  }
  agregarDato3Click() {
    this.agregarDato3 = true;
    this.formFinalizar.controls['clave3'].addValidators(Validators.required);
    this.formFinalizar.controls['valor3'].addValidators(Validators.required);
  }


  openModalDetalle(turno: TurnoCompleto) {
    this.turnoDetalle = turno;
  }

  closeModalDetalle() {
    this.turnoDetalle = null;
  }


}
