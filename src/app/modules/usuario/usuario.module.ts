import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { SeccionUsuariosComponent } from 'src/app/components/seccion-usuarios/seccion-usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SeccionUsuariosComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UsuarioModule { }
