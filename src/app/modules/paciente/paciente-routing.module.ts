import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarTurnoComponent } from 'src/app/components/agendar-turno/agendar-turno.component';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { SeccionPacienteComponent } from 'src/app/components/seccion-paciente/seccion-paciente.component';

const routes: Routes = [
  { 
    path: 'mi-perfil',
    component: MiPerfilComponent
  },
  { 
    path: 'mis-turnos',
    component: SeccionPacienteComponent
  },
  {
    path: 'agendar-turno',
    component: AgendarTurnoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
