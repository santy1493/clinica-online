import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeComponent } from './components/home/home.component';
import { VerificarEmailComponent } from './components/verificar-email/verificar-email.component';
import { UsuarioInactivoComponent } from './components/usuario-inactivo/usuario-inactivo.component';
import { SinRolesComponent } from './components/sin-roles/sin-roles.component';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { RegistroModule } from './modules/registro/registro.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { SpeedDialFabComponent } from './components/speed-dial-fab/speed-dial-fab.component';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoadingComponent,
    VerificarEmailComponent,
    UsuarioInactivoComponent,
    SinRolesComponent,
    SpeedDialFabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RegistroModule,
    UsuarioModule,
    //provideFirebaseApp(() => initializeApp({"projectId":"clinica-cf4a7","appId":"1:941218245103:web:21656f87fef0e8a2522e1a","storageBucket":"clinica-cf4a7.appspot.com","apiKey":"AIzaSyA4IV7V34Qt5q_HalC3z-lrT320T_DOCR8","authDomain":"clinica-cf4a7.firebaseapp.com","messagingSenderId":"941218245103"})),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
