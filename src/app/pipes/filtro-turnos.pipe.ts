import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../models/turno';
import { TurnoCompleto } from '../models/turno-completo';

@Pipe({
  name: 'filtroTurnos'
})
export class FiltroTurnosPipe implements PipeTransform {

  transform(value: TurnoCompleto[], arg: string): TurnoCompleto[] {

    const result: TurnoCompleto[] = [];

    if(value != null && value.length > 0 && arg != null) {

      let filtro = arg.toLowerCase();

      for(const turno of value) {
        if(turno.especialidad?.toLowerCase().includes(filtro)
        || turno.especialista?.apellido.toLowerCase().includes(filtro)
        || turno.especialista?.nombre.toLowerCase().includes(filtro)
        || turno.paciente?.nombre.toLowerCase().includes(filtro)
        || turno.paciente?.apellido.toLowerCase().includes(filtro)
        || turno.historia?.clave1?.toLowerCase().includes(filtro)
        || turno.historia?.clave2?.toLowerCase().includes(filtro)
        || turno.historia?.clave3?.toLowerCase().includes(filtro)
        || turno.estado?.toLowerCase().includes(filtro)
        || turno.fecha?.toLowerCase().includes(filtro)
        ) {
          result.push(turno);
        }
        
      }
      return result;
    }

    return value;
  }

}
