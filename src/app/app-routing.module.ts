import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/homes/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';


import { HomeAdminComponent } from './components/homes/home-admin/home-admin.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminAlimentosComponent } from './components/admin/admin-alimentos/admin-alimentos.component';
import { AdminEjerciciosComponent } from './components/admin/admin-ejercicios/admin-ejercicios.component';

import { HomeUserComponent } from './components/homes/home-user/home-user.component';
import { UserDietaComponent } from './components/user/user-dieta/user-dieta.component';
import { UserDietaDetalleComponent } from './components/user/user-dieta-detalle/user-dieta-detalle.component';
import { UserDietaDiaComponent } from './components/user/user-dieta-dia/user-dieta-dia.component';


import { UserRutinaComponent } from './components/user/user-rutina/user-rutina.component';
import { UserRutinaDetalleComponent } from './components/user/user-rutina-detalle/user-rutina-detalle.component';

import { UserDiarioComponent } from './components/user/user-diario/user-diario.component';
import { UserNotaDiarioComponent } from './components/user/user-nota-diario/user-nota-diario.component';
import { UserNotaDiarioNuevaComponent } from './components/user/user-nota-diario-nueva/user-nota-diario-nueva.component';



import { HomeEpComponent } from './components/homes/home-ep/home-ep.component';
import { EpRutinaComponent } from './components/ep/admin-rutinas/rutinas-listado/ep-rutina.component';
import { RutinaNuevaComponent } from './components/ep/admin-rutinas/rutina-nueva/rutina-nueva.component';
// import { RutinaDiaSemanaRutinaNuevaComponent } from './components/ep/admin-rutinas/_____rutina-dia-semana-rutina-nueva/rutina-dia-semana-rutina-nueva.component';
// import { RutinaEjercicioNuevoComponent } from './components/ep/admin-rutinas/_____rutina-ejercicio-nuevo/rutina-ejercicio-nuevo.component';
import { RutinaVistaGeneralComponent } from './components/ep/admin-rutinas/rutina-vista-general/rutina-vista-general.component';
import { RutinaVistaDetalleComponent } from './components/ep/admin-rutinas/rutina-vista-detalle/rutina-vista-detalle.component';
import { RutinaEjercicioComponent } from './components/ep/admin-rutinas/rutina-ejercicio/rutina-ejercicio.component';

import { EpDietaComponent } from './components/ep/admin-dietas/dietas-listado/ep-dieta.component';
import { DietaNuevaComponent } from './components/ep/admin-dietas/dieta-nueva/dieta-nueva.component';
// import { DietaDiaSemanaNuevaComponent } from './components/ep/admin-dietas/dieta-dia-semana-nueva/dieta-dia-semana-nueva.component';
import { DietaVistaGeneralComponent } from './components/ep/admin-dietas/dieta-vista-general/dieta-vista-general.component';
import { DietaVistaDetalleComponent } from './components/ep/admin-dietas/dieta-vista-detalle/dieta-vista-detalle.component';
import { DietaComidaDetalleComponent } from './components/ep/admin-dietas/dieta-comida-detalle/dieta-comida-detalle.component';
import { DietaComidaEditComponent } from './components/ep/admin-dietas/dieta-comida-edit/dieta-comida-edit.component';




import { CanActivateTokenGuard } from './guards/token.guard';
import { CanActivateAdminRolGuard } from './guards/rolAdmin.guard';
import { CanActivateEpRolGuard } from './guards/rolEp.guard';
import { CanActivateUserRolGuard } from './guards/rolUser.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'profile', component: ProfileComponent },


    { path: 'home-admin',  canActivate: [CanActivateTokenGuard, CanActivateAdminRolGuard], component: HomeAdminComponent },
    { path: 'admin-users',  canActivate: [CanActivateTokenGuard, CanActivateAdminRolGuard], component: AdminUsersComponent },
    { path: 'admin-alimentos',  canActivate: [CanActivateTokenGuard, CanActivateAdminRolGuard], component: AdminAlimentosComponent },
    { path: 'admin-ejercicios',  canActivate: [CanActivateTokenGuard, CanActivateAdminRolGuard], component: AdminEjerciciosComponent },

    { path: 'home-user',  canActivate: [CanActivateTokenGuard, CanActivateUserRolGuard], component: HomeUserComponent },
    { path: 'user-dieta', canActivate: [CanActivateTokenGuard, CanActivateUserRolGuard], component: UserDietaComponent },
    { path: 'user-dieta-detalle/:dietaId', canActivate: [CanActivateTokenGuard, CanActivateUserRolGuard], component: UserDietaDetalleComponent },
    { path: 'user-dieta-dia/:diaSemanaDietaId', canActivate: [CanActivateTokenGuard, CanActivateUserRolGuard], component: UserDietaDiaComponent },


    { path: 'user-rutina', canActivate: [CanActivateTokenGuard, CanActivateUserRolGuard], component: UserRutinaComponent },
    { path: 'user-rutina-detalle/:rutinaId', canActivate: [CanActivateTokenGuard, CanActivateUserRolGuard], component: UserRutinaDetalleComponent },

    { path: 'user-diario', canActivate: [CanActivateTokenGuard, CanActivateUserRolGuard], component: UserDiarioComponent },
    { path: 'user-nota-diario/:notaDiarioId', canActivate: [CanActivateTokenGuard, CanActivateUserRolGuard], component: UserNotaDiarioComponent },

    { path: 'user-nota-diario-nueva/:fecha', canActivate: [CanActivateTokenGuard, CanActivateUserRolGuard], component: UserNotaDiarioNuevaComponent },


    { path: 'home-ep',  canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: HomeEpComponent },
    { path: 'rutinas-listado', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: EpRutinaComponent },
    { path: 'rutina-nueva', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: RutinaNuevaComponent },
    // { path: 'rutina-dia-nueva', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: RutinaDiaSemanaRutinaNuevaComponent },
    // { path: 'rutina-ejercicio-nuevo', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: RutinaEjercicioNuevoComponent },

    { path: 'rutina/:rutinaId', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: RutinaVistaGeneralComponent },
    { path: 'rutina-detalle/:diaSemanaRutinaId', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: RutinaVistaDetalleComponent },
    { path: 'rutina-ejercicio/:ejercicioId', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: RutinaEjercicioComponent },

    { path: 'dietas-listado', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: EpDietaComponent },
    { path: 'dieta-nueva', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: DietaNuevaComponent },
    // { path: 'dieta-dia-nueva', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: DietaDiaSemanaNuevaComponent },
    { path: 'dieta/:dietaId', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: DietaVistaGeneralComponent },
    { path: 'dieta-detalle/:diaSemanaDietaId', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: DietaVistaDetalleComponent },
    { path: 'dieta-comida-detalle/:comidaId', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: DietaComidaDetalleComponent },
    { path: 'dieta-comida-edit/:detalleComidaId', canActivate: [CanActivateTokenGuard, CanActivateEpRolGuard], component: DietaComidaEditComponent },



    // { path: 'dieta', canActivate: [CanActivateTokenGuard], component: DietaComponent },
    // { path: 'rutina', canActivate: [CanActivateTokenGuard], component: RutinaComponent },

    { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
