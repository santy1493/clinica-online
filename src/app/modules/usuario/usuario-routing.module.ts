import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeccionUsuariosComponent } from 'src/app/components/seccion-usuarios/seccion-usuarios.component';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
  { 
    path: 'admin',
    canActivate: [ RoleGuard ],
    data: {
      roles: ['admin']
    },
    component: SeccionUsuariosComponent
  },
  { 
    path: 'paciente',
    canActivate: [ RoleGuard ],
    data: {
      roles: ['paciente']
    },
    loadChildren: () =>
      import('../paciente/paciente.module').then((m) => m.PacienteModule),
  },
  { 
    path: 'especialista',
    canActivate: [ RoleGuard ],
    data: {
      roles: ['especialista']
    },
    loadChildren: () =>
      import('../especialista/especialista.module').then((m) => m.EspecialistaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
