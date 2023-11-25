import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialistaRoutingModule } from './especialista-routing.module';
import { SeccionEspecialistaComponent } from 'src/app/components/seccion-especialista/seccion-especialista.component';
import { PerfilEspecialistaComponent } from 'src/app/components/perfil-especialista/perfil-especialista.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    SeccionEspecialistaComponent,
    PerfilEspecialistaComponent
  ],
  imports: [
    CommonModule,
    EspecialistaRoutingModule,
    ReactiveFormsModule,
    MatSliderModule
  ]
})
export class EspecialistaModule { }
