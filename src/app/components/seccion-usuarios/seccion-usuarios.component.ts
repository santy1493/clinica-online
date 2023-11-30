import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/models/historia-clinica';
import { PacienteHistoria } from 'src/app/models/paciente-historia';
import { Usuario } from 'src/app/models/usuario';
import { ExcelService } from 'src/app/services/excel.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})
export class SeccionUsuariosComponent implements OnInit{
  
  usuarios: Usuario[];
  loading: boolean = false;



  pacientes: Usuario[];
  especialistas: Usuario[];
  historias: HistoriaClinica[];
  pacientesHistorias: PacienteHistoria[];
  
  historiaDetalle: HistoriaClinica;

  constructor(
    private firestore: FirestoreService,
    private excel: ExcelService
  ){}
  
  ngOnInit(): void {
    this.loading = true;
    this.firestore.obtenerTodosUsuarios().subscribe(res => {
      this.usuarios = res;
      this.loading = false;
    })

    this.firestore.obtenerEspecialistas().subscribe(esp => {
      this.especialistas = esp;

      this.firestore.obtenerPacientes().subscribe(pac => {
        this.pacientes = pac;
  
        this.firestore.obtenerHistoriasClinicas().subscribe(his => {
          this.historias = his;
  
          this.pacientesHistorias = [];
  
          this.pacientes.forEach(p => {
  
            const hisAux = this.historias.filter(h => h.paciente === p.email);
  
            const pacienteHistoria: PacienteHistoria = {
              paciente: p,
              historias: hisAux.length > 0 ? hisAux : null 
            }
  
            this.pacientesHistorias.push(pacienteHistoria);
          })
  
        })
      })

    })

    
  }

  activarUsuario(usuario: Usuario) {
    this.firestore.activarUsuario(usuario);
  }

  desactivarUsuario(usuario: Usuario) {
    this.firestore.desactivarUsuario(usuario);
  }

  descargarExcel() {
    this.excel.generateExcel(this.usuarios);
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

  formatearEspecialista(email: string) {
    const especialista = this.especialistas.filter(x => x.email === email);
    return `${especialista[0].apellido}, ${especialista[0].nombre}`;
  }

}
