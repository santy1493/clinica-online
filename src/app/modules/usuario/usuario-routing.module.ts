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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
