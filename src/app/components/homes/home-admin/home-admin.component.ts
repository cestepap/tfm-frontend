import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
  public user: any = this.storeService.getItem('user');
  public token: any = this.storeService.getItem('token');

  // public user: any = this.storeService.getUser();
  // public token: any = this.storeService.getToken();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    if (this.token) {
      console.log(this.token);
      console.log('permission granted. token saved');
    } else {
      console.log('no token saved');
    }
  }
}
