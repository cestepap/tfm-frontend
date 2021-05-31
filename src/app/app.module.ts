import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { HomeComponent } from './components/homes/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivateTokenGuard } from './guards/token.guard';
import { CanActivateAdminRolGuard } from './guards/rolAdmin.guard';
import { CanActivateEpRolGuard } from './guards/rolEp.guard';
import { CanActivateUserRolGuard } from './guards/rolUser.guard';
import { UserDietaComponent } from './components/user/user-dieta/user-dieta.component';
import { UserRutinaComponent } from './components/user/user-rutina/user-rutina.component';
import { UserDiarioComponent } from './components/user/user-diario/user-diario.component';
import { AdminAlimentosComponent } from './components/admin/admin-alimentos/admin-alimentos.component';
import { AdminEjerciciosComponent } from './components/admin/admin-ejercicios/admin-ejercicios.component';
import { HomeUserComponent } from './components/homes/home-user/home-user.component';
import { HomeEpComponent } from './components/homes/home-ep/home-ep.component';
import { HomeAdminComponent } from './components/homes/home-admin/home-admin.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

import { MatTableModule } from '@angular/material/table';
import { HeaderAdminComponent } from './components/headers/header-admin/header-admin.component';
import { HeaderComponent } from './components/headers/header/header.component';
import { HeaderEpComponent } from './components/headers/header-ep/header-ep.component';
import { HeaderUserComponent } from './components/headers/header-user/header-user.component';
import { EpDietaComponent } from './components/ep/admin-dietas/dietas-listado/ep-dieta.component';
import { EpRutinaComponent } from './components/ep/admin-rutinas/rutinas-listado/ep-rutina.component';
import { FooterComponent } from './components/footer/footer.component';
import { RutinaVistaGeneralComponent } from './components/ep/admin-rutinas/rutina-vista-general/rutina-vista-general.component';
import { RutinaVistaDetalleComponent } from './components/ep/admin-rutinas/rutina-vista-detalle/rutina-vista-detalle.component';
import { RutinaEjercicioComponent } from './components/ep/admin-rutinas/rutina-ejercicio/rutina-ejercicio.component';
import { RutinaNuevaComponent } from './components/ep/admin-rutinas/rutina-nueva/rutina-nueva.component';
import { DietaNuevaComponent } from './components/ep/admin-dietas/dieta-nueva/dieta-nueva.component';
import { DietaVistaGeneralComponent } from './components/ep/admin-dietas/dieta-vista-general/dieta-vista-general.component';
import { DietaVistaDetalleComponent } from './components/ep/admin-dietas/dieta-vista-detalle/dieta-vista-detalle.component';
import { DietaComidaDetalleComponent } from './components/ep/admin-dietas/dieta-comida-detalle/dieta-comida-detalle.component';

import { ChartsModule } from 'ng2-charts';
import { UserDietaDetalleComponent } from './components/user/user-dieta-detalle/user-dieta-detalle.component';
import { UserRutinaDetalleComponent } from './components/user/user-rutina-detalle/user-rutina-detalle.component';
import { UserDietaDiaComponent } from './components/user/user-dieta-dia/user-dieta-dia.component';
import { ProfileComponent } from './components/profile/profile.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UserNotaDiarioComponent } from './components/user/user-nota-diario/user-nota-diario.component';
import { UserNotaDiarioNuevaComponent } from './components/user/user-nota-diario-nueva/user-nota-diario-nueva.component';
import { DietaComidaEditComponent } from './components/ep/admin-dietas/dieta-comida-edit/dieta-comida-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminUsersComponent,
    HomeComponent,
    UserDietaComponent,
    UserRutinaComponent,
    UserDiarioComponent,
    AdminAlimentosComponent,
    AdminEjerciciosComponent,
    HomeUserComponent,
    HomeEpComponent,
    HomeAdminComponent,
    UserInfoComponent,
    HeaderAdminComponent,
    HeaderComponent,
    HeaderEpComponent,
    HeaderUserComponent,
    EpDietaComponent,
    EpRutinaComponent,
    FooterComponent,
    RutinaVistaGeneralComponent,
    RutinaVistaDetalleComponent,
    RutinaEjercicioComponent,
    RutinaNuevaComponent,
    DietaNuevaComponent,
    DietaVistaGeneralComponent,
    DietaVistaDetalleComponent,
    DietaComidaDetalleComponent,
    UserDietaDetalleComponent,
    UserRutinaDetalleComponent,
    UserDietaDiaComponent,
    ProfileComponent,
    UserNotaDiarioComponent,
    UserNotaDiarioNuevaComponent,
    DietaComidaEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    ChartsModule,
    MatTableModule,
    MatInputModule
  ],
  providers: [
    CanActivateTokenGuard,
    CanActivateAdminRolGuard,
    CanActivateEpRolGuard,
    CanActivateUserRolGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
