import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  public user: any = this.storeService.getItem('user');
  public token: any = this.storeService.getItem('token');

  // public user: any = this.storeService.getUser();
  // public token: any = this.storeService.getToken();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    if (this.token) {
      console.log('permission granted. token saved');
      console.log(this.user.username);
      console.log(this.user.rol);
      this.storeService.addItem('idEntrenadorPersonal', this.user._id);
    } else {
      console.log('no token saved');
    }
  }
  logout() {
    this.storeService.removeItem('user');
    this.storeService.removeItem('token');
  }
}
