import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  showVerificarEmail() {
    Swal.fire({
      icon: "warning",
      title: "Correo no verificado",
      text: "Por favor verifique su casilla de correo para activar su cuenta"
    });
  }

  showCuentaInactiva() {
    Swal.fire({
      icon: "warning",
      title: "Cuenta inactiva",
      text: "Su cuenta no ha sido activada por un administrador"
    });
  }

  showHorarioRepetido() {
    Swal.fire({
      icon: "error",
      title: "Horario Repetido",
      text: "Ya existe un horario con la misma especialidad. Elimine el existente para crear uno nuevo"
    });
  }

}
