import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})
export class SeccionUsuariosComponent implements OnInit{
  
  usuarios: Usuario[];
  loading = true;

  constructor(
    private firestore: FirestoreService,
  ){}
  
  ngOnInit(): void {
    this.firestore.obtenerTodosUsuarios().subscribe(res => {
      this.usuarios = res;
      this.loading = false;
    })
  }

  activarUsuario(usuario: Usuario) {
    this.firestore.activarUsuario(usuario);
  }

  desactivarUsuario(usuario: Usuario) {
    this.firestore.desactivarUsuario(usuario);
  }

}
