import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, query, where, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Horario } from '../models/horario';
import { Turno } from '../models/turno';
import { Especialidad } from '../models/especialidad';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  agregarUsuario(usuario: Usuario) {
    const usuarioRef = collection(this.firestore, 'usuarios');
    return addDoc(usuarioRef, usuario).catch(err => {
      console.log(err);
    });
  }

  obtenerUsuarios(email: string): Observable<Usuario[]> {
    const usuarioRef = collection(this.firestore, 'usuarios');
    const q = query(usuarioRef, where('email', '==', email));
    return collectionData(q, { idField: 'id'}) as Observable<Usuario[]>;
  }

  obtenerTodosUsuarios(): Observable<Usuario[]> {
    const usuarioRef = collection(this.firestore, 'usuarios');
    return collectionData(usuarioRef, { idField: 'id'}) as Observable<Usuario[]>;
  }

  async obtenerUsuario(email: string): Promise<Usuario> {
    const q = query(collection(this.firestore, 'usuarios'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if(querySnapshot) {
      return querySnapshot.docs[0].data() as Usuario
    }
    return null;
  }

  activarUsuario(usuario: Usuario) {
    const usuarioRef = collection(this.firestore, 'usuarios');
    const documento = doc(usuarioRef, usuario.id);
    return updateDoc(documento, {
      activo: true
    });
  }

  desactivarUsuario(usuario: Usuario) {
    const usuarioRef = collection(this.firestore, 'usuarios');
    const documento = doc(usuarioRef, usuario.id);
    return updateDoc(documento, {
      activo: false
    });
  }


  obtenerEspecialistas(): Observable<Usuario[]> {
    const usuarioRef = collection(this.firestore, 'usuarios');
    const q = query(usuarioRef, where('rol', '==', 'especialista'));
    return collectionData(q, { idField: 'id'}) as Observable<Usuario[]>;
  }



  /***************************** HORARIOS *****************************/


  agregarHorario(horario: Horario) {
    const horarioRef = collection(this.firestore, 'horarios');
    return addDoc(horarioRef, horario).catch(err => {
      console.log(err);
    });
  }

  obtenerHorarios(): Observable<Horario[]> {
    const horarioRef = collection(this.firestore, 'horarios');
    return collectionData(horarioRef, { idField: 'id'}) as Observable<Horario[]>;
  }

  obtenerHorariosPorEspecialista(especialista: string): Observable<Horario[]> {
    const horarioRef = collection(this.firestore, 'horarios');
    const q = query(horarioRef, where('especialista', '==', especialista));
    return collectionData(q, { idField: 'id'}) as Observable<Horario[]>;
  }



  /***************************** TURNOS *****************************/


  agregarTurno(turno: Turno) {
    const turnoRef = collection(this.firestore, 'turnos');
    return addDoc(turnoRef, turno).catch(err => {
      console.log(err);
    });
  }

  obtenerTurnosPorEspecialista(especialista: string): Observable<Turno[]> {
    const turnoRef = collection(this.firestore, 'turnos');
    const q = query(turnoRef, where('especialista', '==', especialista));
    return collectionData(q, { idField: 'id'}) as Observable<Turno[]>;
  }

  obtenerTurnosPorPaciente(paciente: string): Observable<Turno[]> {
    const turnoRef = collection(this.firestore, 'turnos');
    const q = query(turnoRef, where('paciente', '==', paciente));
    return collectionData(q, { idField: 'id'}) as Observable<Turno[]>;
  }



  /***************************** ESPECIALIDADES *****************************/


  agregarEspecialidad(especialidad: Especialidad) {
    const especialidadRef = collection(this.firestore, 'especialidades');
    return addDoc(especialidadRef, especialidad).catch(err => {
      console.log(err);
    });
  }

  obtenerEspecialidades(): Observable<Especialidad[]> {
    const especialidadRef = collection(this.firestore, 'especialidades');
    return collectionData(especialidadRef, { idField: 'id'}) as Observable<Especialidad[]>;
  }


  /***************************** OBRAS SOCIALES *****************************/

  agregarObraSocial(obraSocial: any) {
    const obraSocialRef = collection(this.firestore, 'obras-sociales');
    return addDoc(obraSocialRef, obraSocial).catch(err => {
      console.log(err);
    });
  }

  obtenerObrasSociales(): Observable<any[]> {
    const obraSocialRef = collection(this.firestore, 'obras-sociales');
    return collectionData(obraSocialRef, { idField: 'id'}) as Observable<any[]>;
  }


  /*agregarLog(log: Log) {
    const logRef = collection(this.firestore, 'logs');
    return addDoc(logRef, log).catch(err => {
      console.log(err);
    });
  }

  agregarMensaje(mensaje: Mensaje) {
    const mensajeRef = collection(this.firestore, 'mensajes');
    return addDoc(mensajeRef, mensaje).catch(err => {
      console.log(err);
    });
  }

  obtenerMensajes(): Observable<Mensaje[]> {
    const mensajesRef = collection(this.firestore, 'mensajes');
    return collectionData(mensajesRef, { idField: 'id'}) as Observable<Mensaje[]>;
  }

  agregarEncuesta(encuesta: Encuesta) {
    const encuestaRef = collection(this.firestore, 'encuestas');
    return addDoc(encuestaRef, encuesta).catch(err => {
      console.log(err);
    });
  }

  obtenerEncuestas(): Observable<Encuesta[]> {
    const encuestaRef = collection(this.firestore, 'encuestas');
    return collectionData(encuestaRef, { idField: 'id'}) as Observable<Encuesta[]>;
  }

  agregarPuntajePreguntados(puntaje: PuntajePreguntados) {
    const puntajeaRef = collection(this.firestore, 'preguntados');
    return addDoc(puntajeaRef, puntaje).catch(err => {
      console.log(err);
    });
  }

  obtenerPuntajesPreguntados(): Observable<PuntajePreguntados[]> {
    const puntajeaRef = collection(this.firestore, 'preguntados');
    return collectionData(puntajeaRef, { idField: 'id'}) as Observable<PuntajePreguntados[]>;
  }

  agregarPuntajeMayorMenor(puntaje: PuntajePreguntados) {
    const puntajeaRef = collection(this.firestore, 'mayor-menor');
    return addDoc(puntajeaRef, puntaje).catch(err => {
      console.log(err);
    });
  }

  obtenerPuntajesMayorMenor(): Observable<PuntajePreguntados[]> {
    const puntajeaRef = collection(this.firestore, 'mayor-menor');
    return collectionData(puntajeaRef, { idField: 'id'}) as Observable<PuntajePreguntados[]>;
  }

  agregarPuntajeAhorcado(puntaje: PuntajeAhorcado) {
    const puntajeaRef = collection(this.firestore, 'ahorcado');
    return addDoc(puntajeaRef, puntaje).catch(err => {
      console.log(err);
    });
  }

  obtenerPuntajesAhorcado(): Observable<PuntajeAhorcado[]> {
    const puntajeaRef = collection(this.firestore, 'ahorcado');
    return collectionData(puntajeaRef, { idField: 'id'}) as Observable<PuntajeAhorcado[]>;
  }

  agregarPuntajePong(puntaje: PuntajePong) {
    const puntajeaRef = collection(this.firestore, 'pong');
    return addDoc(puntajeaRef, puntaje).catch(err => {
      console.log(err);
    });
  }

  obtenerPuntajesPong(): Observable<PuntajePong[]> {
    const puntajeaRef = collection(this.firestore, 'pong');
    return collectionData(puntajeaRef, { idField: 'id'}) as Observable<PuntajePong[]>;
  }


  obtenerPublicaciones(): Observable<Publicacion[]> {
    const publicacionRef = collection(this.firestore, 'publicaciones');
    return collectionData(publicacionRef, { idField: 'id'}) as Observable<Publicacion[]>;
  }

  obtenerPublicacionesLindas(): Observable<Publicacion[]> {
    const publicacionRef = collection(this.firestore, 'publicaciones');
    const q = query(publicacionRef, where('lindo', '==', true));
    return collectionData(q, { idField: 'id'}) as Observable<Publicacion[]>;
  }

  obtenerPublicacionesFeas(): Observable<Publicacion[]> {
    const publicacionRef = collection(this.firestore, 'publicaciones');
    const q = query(publicacionRef, where('lindo', '==', false));
    return collectionData(q, { idField: 'id'}) as Observable<Publicacion[]>;
  }

  eliminarPublicacion(publicacion: Publicacion) {
    const publicacionRef = doc(this.firestore, `publicaciones/${publicacion.id}`);
    return deleteDoc(publicacionRef);
  }*/

  /*createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDoc<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }*/
}
