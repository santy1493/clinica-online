import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { SeccionUsuariosComponent } from 'src/app/components/seccion-usuarios/seccion-usuarios.component';


@NgModule({
  declarations: [
    SeccionUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
