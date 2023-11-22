import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Usuario } from '../models/usuario';
import { UsuarioLocal } from '../models/usuario-local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(
    private firestore: FirestoreService
  ) { }

  guardarUsuario(usuario: Usuario) {
    const usr: UsuarioLocal = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      activo: usuario.activo
    }
    if(window.localStorage)
      window.localStorage.setItem('usuario', JSON.stringify(usr));
  }

  obtenerUsuario() {
    if(window.localStorage) {
      let jsonString = window.localStorage.getItem('usuario');
      return JSON.parse(jsonString) as UsuarioLocal;
    }
    return null;
  }

  borrarUsuario() {
    if(window.localStorage) {
      window.localStorage.removeItem('usuario');
    }
  }

}
