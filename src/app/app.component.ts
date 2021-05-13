import { Component } from '@angular/core';
import { StoreService } from './services/store.service';
import { UserService } from './services/user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private storeService: StoreService
  ) {}

  public user: any = this.storeService.getItem('user');
  public token: any = this.storeService.getItem('token');

  // public user: any;
  // public token: any;


  ngOnInit(): void {

    // this.user = this.storeService.getUser();
    // this.token = this.storeService.getToken();

    if (this.token) {
      console.log(this.token);
      console.log('permission granted. token saved');
    } else {
      console.log('no token saved');
    }
  }

  logout() {
    // this.storeService.setToken(null);

    this.storeService.removeItem('user');
    this.storeService.removeItem('token');
  }

}
