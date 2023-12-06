import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarTurnoAdminComponent } from 'src/app/components/agendar-turno-admin/agendar-turno-admin.component';
import { InformesAdminComponent } from 'src/app/components/informes-admin/informes-admin.component';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { SeccionUsuariosComponent } from 'src/app/components/seccion-usuarios/seccion-usuarios.component';
import { TurnosAdminComponent } from 'src/app/components/turnos-admin/turnos-admin.component';

const routes: Routes = [
  { 
    path: 'mi-perfil',
    component: MiPerfilComponent
  },
  { 
    path: 'usuarios',
    component: SeccionUsuariosComponent
  },
  {
    path: 'turnos',
    component: TurnosAdminComponent
  },
  {
    path: 'agendar-turno',
    component: AgendarTurnoAdminComponent
  },
  {
    path: 'informes',
    component: InformesAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
