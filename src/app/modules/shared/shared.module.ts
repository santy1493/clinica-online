import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroTurnosPipe } from 'src/app/pipes/filtro-turnos.pipe';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { LoadingComponent } from 'src/app/components/loading/loading.component';




@NgModule({
  declarations: [
    FiltroTurnosPipe,
    MiPerfilComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MdbCarouselModule
  ],
  exports:[
    FiltroTurnosPipe,
    MiPerfilComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
