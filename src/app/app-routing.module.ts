import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VerificarEmailComponent } from './components/verificar-email/verificar-email.component';
import { UsuarioInactivoComponent } from './components/usuario-inactivo/usuario-inactivo.component';

import { EmailGuard } from './guards/email.guard';
import { ActivoGuard } from './guards/activo.guard';
import { RoleGuard } from './guards/role.guard';
import { SinRolesComponent } from './components/sin-roles/sin-roles.component';
import { RegistroModule } from './modules/registro/registro.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { YaLoagueadoGuard } from './guards/ya-loagueado.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home',
    canActivate: [ YaLoagueadoGuard ],
    //canActivate: [ EmailGuard, ActivoGuard ],
    //data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: HomeComponent
  },
  { 
    path: 'login',
    canActivate: [ YaLoagueadoGuard ],
    //canActivate: [ AuthGuard ],
    //data: { authGuardPipe: redirectLoggedInToHome },
    component: LoginComponent
  },
  {
    path: 'registro',
    canActivate: [ YaLoagueadoGuard ],
    //canActivate: [ AuthGuard ],
    //data: { authGuardPipe: redirectLoggedInToHome },
    loadChildren: () =>
      import('./modules/registro/registro.module').then((m) => m.RegistroModule),
  },
  {
    path: 'usuario',
    canActivate: [ AuthGuard, EmailGuard, ActivoGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () =>
      import('./modules/usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  { 
    path: 'verificar-email',
    //canActivate: [ ],
    component: VerificarEmailComponent
  },
  { 
    path: 'usuario-inactivo',
    //canActivate: [ ],
    component: UsuarioInactivoComponent
  },
  { 
    path: 'sin-roles',
    //canActivate: [ ],
    component: SinRolesComponent
  },
  { 
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
