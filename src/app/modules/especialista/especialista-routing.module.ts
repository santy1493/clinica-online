import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilEspecialistaComponent } from 'src/app/components/perfil-especialista/perfil-especialista.component';
import { SeccionEspecialistaComponent } from 'src/app/components/seccion-especialista/seccion-especialista.component';
import { TurnosEspecialistaComponent } from 'src/app/components/turnos-especialista/turnos-especialista.component';

const routes: Routes = [
  { 
    path: '',
    component: SeccionEspecialistaComponent
  },
  {
    path: 'perfil',
    component: PerfilEspecialistaComponent
  },
  {
    path: 'turnos',
    component: TurnosEspecialistaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
