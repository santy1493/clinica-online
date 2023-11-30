import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { AgendarTurnoComponent } from 'src/app/components/agendar-turno/agendar-turno.component';
import { SeccionPacienteComponent } from 'src/app/components/seccion-paciente/seccion-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AgendarTurnoComponent,
    SeccionPacienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PacienteRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PacienteModule { }
