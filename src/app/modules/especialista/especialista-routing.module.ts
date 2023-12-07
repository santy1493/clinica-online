import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { MisPacientesComponent } from 'src/app/components/mis-pacientes/mis-pacientes.component';
import { PerfilEspecialistaComponent } from 'src/app/components/perfil-especialista/perfil-especialista.component';
import { SeccionEspecialistaComponent } from 'src/app/components/seccion-especialista/seccion-especialista.component';
import { TurnosEspecialistaComponent } from 'src/app/components/turnos-especialista/turnos-especialista.component';

const routes: Routes = [
  { 
    path: 'mi-perfil',
    data: {state:  'perfil-especialista'},
    component: MiPerfilComponent
  },
  { 
    path: '',
    component: MiPerfilComponent
  },
  {
    path: 'nuevo-horario',
    component: PerfilEspecialistaComponent
  },
  {
    path: 'mis-turnos',
    data: {state:  'turnos-especialista'},
    component: TurnosEspecialistaComponent
  },
  {
    path: 'pacientes',
    component: MisPacientesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
