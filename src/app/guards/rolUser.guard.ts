import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { StoreService } from '../services/store.service';

@Injectable()
export class CanActivateUserRolGuard implements CanActivate {
  constructor(private storeService: StoreService, private router: Router) {}

  public rol: any = this.storeService.getItem('rol');

  // public token: any = this.storeService.getToken();

  canActivate() {

    // If the user is not logged in we'll send them back to the home page
    if (this.rol != 'Usuario') {
      console.log('No tienes el rol de usuario');

      switch (this.rol) {
        case 'Admin':
          this.router.navigate(['home-admin']);
          break;
        case 'Entrenador Personal':
          this.router.navigate(['home-ep']);
          break;
        case 'Usuario':
          this.router.navigate(['home-user']);
          break;
        default:
          this.router.navigate(['/']);
      }
      return false;
    }

    return true;
  }
}
