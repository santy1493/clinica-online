import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from 'src/app/components/registro/registro.component';
import { RegistroPacienteComponent } from 'src/app/components/registro-paciente/registro-paciente.component';
import { RegistroEspecialistaComponent } from 'src/app/components/registro-especialista/registro-especialista.component';


@NgModule({
  declarations: [
    RegistroComponent,
    RegistroPacienteComponent,
    RegistroEspecialistaComponent,
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegistroModule { }
