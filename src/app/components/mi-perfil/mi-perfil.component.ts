import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoriaClinica } from 'src/app/models/historia-clinica';
import { Horario } from 'src/app/models/horario';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioLocal } from 'src/app/models/usuario-local';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  
  loading: boolean = false;
  usuario: Usuario;
  localUsr: UsuarioLocal;
  horarios: Horario[];

  especialistas: Usuario[];
  historiaDetalle: HistoriaClinica;
  historias: HistoriaClinica[];

  constructor(
    private firestore: FirestoreService,
    private local: LocalService,
    private router: Router
  ){}

  async ngOnInit() {
    this.loading = true;
    this.localUsr = this.local.obtenerUsuario();

    this.firestore.obtenerTodosUsuarios().subscribe(res => {
      this.especialistas = res.filter(x => x.rol === 'especialista');
      this.usuario = res.filter(u => u.email === this.localUsr.email)[0];
      if(this.usuario.rol === 'especialista') {
        this.firestore.obtenerHorariosPorEspecialista(this.usuario.email).subscribe(hor => {
          this.horarios = hor;
          this.loading = false;
        })
      }
      else if(this.usuario.rol === 'paciente') {
        this.firestore.obtenerHistoriasClinicas().subscribe(his => {
          this.historias = his.filter(h => h.paciente === this.usuario.email);
          this.loading = false;
        })
      }
      else {
        this.loading = false;
      }
    });
  }

  irANuevoHorario() {
    this.router.navigate(['/usuario/especialista/nuevo-horario']);
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
