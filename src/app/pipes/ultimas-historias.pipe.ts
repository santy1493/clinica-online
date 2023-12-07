import { Pipe, PipeTransform } from '@angular/core';
import { HistoriaClinica } from '../models/historia-clinica';
import { TurnoCompleto } from '../models/turno-completo';

@Pipe({
  name: 'ultimasTurnos'
})
export class UltimasHistoriasPipe implements PipeTransform {

  transform(value: TurnoCompleto[]): TurnoCompleto[] {

    const historiasHordenadas = value.sort((a, b) => new Date(b.fecha).getTime() - (new Date(a.fecha)).getTime());

    if(historiasHordenadas.length > 3) {
      return historiasHordenadas.slice(0, 3);
    }

    return historiasHordenadas;
  }

}
