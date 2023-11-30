import { Component, OnInit } from '@angular/core';
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
  
  usuario: Usuario;
  localUsr: UsuarioLocal;

  constructor(
    private firestore: FirestoreService,
    private local: LocalService
  ){}

  async ngOnInit() {
    this.localUsr = this.local.obtenerUsuario();

    this.firestore.obtenerTodosUsuarios().subscribe(res => {
      this.usuario = res.filter(u => u.email === this.localUsr.email)[0];
      console.log(this.usuario);
    });
  }

}
