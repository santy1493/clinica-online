import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearFecha'
})
export class FormatearFechaPipe implements PipeTransform {

  transform(value: string): string {

    let date = new Date(value);
    return date.toLocaleDateString('en-GB');

  }

}
