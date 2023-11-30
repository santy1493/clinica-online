import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroTurnosPipe } from 'src/app/pipes/filtro-turnos.pipe';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';



@NgModule({
  declarations: [
    FiltroTurnosPipe,
    MiPerfilComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    FiltroTurnosPipe,
    MiPerfilComponent
  ]
})
export class SharedModule { }
