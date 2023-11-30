import { Component, OnInit } from '@angular/core';
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

  constructor(
    private firestore: FirestoreService,
    private local: LocalService
  ){}

  async ngOnInit() {
    this.loading = true;
    this.localUsr = this.local.obtenerUsuario();

    this.firestore.obtenerTodosUsuarios().subscribe(res => {
      this.usuario = res.filter(u => u.email === this.localUsr.email)[0];
      if(this.usuario.rol === 'especialista') {
        this.firestore.obtenerHorariosPorEspecialista(this.usuario.email).subscribe(hor => {
          this.horarios = hor;
          this.loading = false;
        })
      }
      else {
        this.loading = false;
      }
    });
  }

}
