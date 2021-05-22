import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { NgForm } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: User[];
  selectedUser: User = {
    username: '',
    email: '',
    password: '',
    rol: '',
    imagen: 'assets/img/perfil.jpg'
  };

  public user: any = this.storeService.getItem('user');
  public token: any = this.storeService.getItem('token');

  public errorForm = '';
  public msgForm = '';

  // public user: any = this.storeService.getUser();
  // public token: any = this.storeService.getToken();

  constructor(
    private userService: UserService,
    private storeService: StoreService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.getUsers();

    if (this.token) {
      console.log('permission granted. token saved');
    }
    else {
      console.log('no token saved');
    }

  }

  resetForm() {
    this.errorForm = '';
    this.msgForm = '';
    this.selectedUser = {
      username: '',
      email: '',
      password: '',
      rol: '',
      imagen: 'assets/img/perfil.jpg'
    };
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res;
        console.log(this.users);
      },
      (err) => console.log(err)
    );
  }

  addUser(form: NgForm) {

    console.log(form);

    if (form.value._id) {
      this.userService.putUser(form.value).subscribe(
        (res) => {
          console.log(res);
          this.msgForm = 'Actualizado.';
          this.errorForm = '';
          // this.storeService.addItem('user', res);
          this.getUsers();
        },
        (err) => console.log(err)
      );
      }
    // } else {
    //   // this.userService.createUser(form.value).subscribe(
    //   //   (res) => {
    //   //     this.getUsers();
    //   //     form.reset();
    //   //   },
    //   //   (err) => console.log(err)
    //   // );
    // }
  }

  deleteUser(id: string) {
    if (confirm('Are you sure to you want to delete it?')) {
      this.userService.deleteUser(id).subscribe(
        (res) => {
          console.log(id);
          this.getUsers();
        },
        (err) => console.log(err)
      );
    }
  }

  editUser(user: User) {
    this.selectedUser = user;
  }
}
