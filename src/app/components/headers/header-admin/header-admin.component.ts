import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor(
    private userService: UserService,
    private storeService: StoreService
  ) {}

  public user: any = this.storeService.getItem('user');
  public token: any = this.storeService.getItem('token');


  // logout() {

  //   this.storeService.removeItem('user');
  //   this.storeService.removeItem('token');
  // }

  ngOnInit(): void {

    if (this.token) {
      // console.log(this.token);
      console.log('permission granted. token saved');
    } else {
      console.log('no token saved');
    }
  }
}
