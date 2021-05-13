import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { StoreService } from '../services/store.service';

@Injectable()
export class CanActivateTokenGuard implements CanActivate {
  constructor(private storeService: StoreService, private router: Router) {}

  public token: any = this.storeService.getItem('token');

  // public token: any = this.storeService.getToken();

  canActivate() {
    console.log(this.token);

    // If the user is not logged in we'll send them back to the home page

    if (!this.token) {
      console.log('No tienes token');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
