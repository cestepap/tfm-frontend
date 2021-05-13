import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { NgForm } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  users: User[];
  selectedUser: User = {
    username: '',
    email: '',
    password: '',
    rol: '',
    imagen: 'assets/img/perfil.jpg',
  };

  public user: any = this.storeService.getItem('user');
  public token: any = this.storeService.getItem('token');

  public errorForm = '';
  public msgForm = '';

  public header = '';

  constructor(
    private userService: UserService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getUsers();
    console.log(this.user);

    if (this.token) {
      console.log('permission granted. token saved');
    } else {
      console.log('no token saved');
    }

    if (this.user.rol) {
      switch (this.user.rol) {
        case 'Admin':
          this.header = 'Admin';
          break;
        case 'Entrenador personal':
          this.header = 'EP';
          break;
        case 'Usuario':
          this.header = 'User';
          break;
        default:
          this.header = 'User';
      }
    }
  }

  addUser(form: NgForm) {
    if (form.value._id) {
      this.userService.putUser(form.value).subscribe(
        (res) => {
          console.log(res);
          this.storeService.addItem('user', res);

          this.msgForm = 'Actualizado.';
          this.errorForm = '';
          // this.storeService.addItem('user', res);
        },
        (err) => console.log(err)
      );
    } else {
    }
  }
}
