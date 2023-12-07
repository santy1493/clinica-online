import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroTurnosPipe } from 'src/app/pipes/filtro-turnos.pipe';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { FormatearFechaPipe } from 'src/app/pipes/formatear-fecha.pipe';
import { ResaltarDirective } from 'src/app/directives/resaltar.directive';
import { CaptchaDirective } from 'src/app/directives/captcha.directive';
import { UltimasHistoriasPipe } from 'src/app/pipes/ultimas-historias.pipe';
import { FocusDirective } from 'src/app/directives/focus.directive';




@NgModule({
  declarations: [
    FiltroTurnosPipe,
    MiPerfilComponent,
    LoadingComponent,
    FormatearFechaPipe,
    ResaltarDirective,
    CaptchaDirective,
    UltimasHistoriasPipe,
    FocusDirective
  ],
  imports: [
    CommonModule,
    MdbCarouselModule
  ],
  exports:[
    FiltroTurnosPipe,
    MiPerfilComponent,
    LoadingComponent,
    FormatearFechaPipe,
    ResaltarDirective,
    CaptchaDirective,
    UltimasHistoriasPipe,
    FocusDirective
  ]
})
export class SharedModule { }
