import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialistaRoutingModule } from './especialista-routing.module';
import { SeccionEspecialistaComponent } from 'src/app/components/seccion-especialista/seccion-especialista.component';
import { PerfilEspecialistaComponent } from 'src/app/components/perfil-especialista/perfil-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatSliderModule} from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TurnosEspecialistaComponent } from 'src/app/components/turnos-especialista/turnos-especialista.component';
import { SharedModule } from '../shared/shared.module';
import { MisPacientesComponent } from 'src/app/components/mis-pacientes/mis-pacientes.component';

@NgModule({
  declarations: [
    SeccionEspecialistaComponent,
    PerfilEspecialistaComponent,
    TurnosEspecialistaComponent,
    MisPacientesComponent
  ],
  imports: [
    CommonModule,
    EspecialistaRoutingModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    SharedModule
  ]
})
export class EspecialistaModule { }
