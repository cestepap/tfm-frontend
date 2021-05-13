import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css'],
})
export class HomeUserComponent implements OnInit {
  public user: any = this.storeService.getItem('user');
  public token: any = this.storeService.getItem('token');

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
