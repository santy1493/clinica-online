import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SeccionUsuariosComponent } from 'src/app/components/seccion-usuarios/seccion-usuarios.component';
import { AgendarTurnoAdminComponent } from 'src/app/components/agendar-turno-admin/agendar-turno-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TurnosAdminComponent } from 'src/app/components/turnos-admin/turnos-admin.component';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';


@NgModule({
  declarations: [
    SeccionUsuariosComponent,
    AgendarTurnoAdminComponent,
    TurnosAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }