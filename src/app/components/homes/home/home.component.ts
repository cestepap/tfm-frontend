import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { StoreService } from '../../../services/store.service';
import { User } from '../../../models/User';
import { Role } from '../../../models/Role';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from '../../../models/token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: User[];

  public user: any = this.storeService.getItem('user');
  public token: any = this.storeService.getItem('token');
  public userRol: any = this.storeService.getItem('rol');

  // public user: any = this.storeService.getUser();
  // public token: any = this.storeService.getToken();

  public islogged: any = this.storeService.getItem('isLogged');

  roles: Role[] = [{ name: 'Entrenador personal' }, { name: 'Usuario' }];

  public email: FormControl;
  public password: FormControl;
  public username: FormControl;
  public email2: FormControl;
  public password2: FormControl;
  public rol: FormControl;
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  private validate_email = '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$';
  public message: string = '';
  public message2: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // sign in form
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.validate_email),
    ]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
    // sign in form

    // sign up form
    this.username = new FormControl('', [Validators.required]);

    this.email2 = new FormControl('', [
      Validators.required,
      Validators.pattern(this.validate_email),
    ]);
    this.password2 = new FormControl('', [Validators.required]);
    this.rol = new FormControl('', [Validators.required]);

    this.signupForm = this.formBuilder.group({
      username: this.username,
      email2: this.email2,
      password2: this.password2,
      rol: this.rol,
    });
    // sign up form

    // this.getUsers();

    if (this.token) {
      console.log('permission granted. token saved');
      this.redirectHome();
    } else {
      console.log('no token saved');
    }
  }

  redirectHome(){
    if (this.userRol){
      switch (this.userRol) {
        case 'Admin':
          this.router.navigate(['home-admin']);
          break;
        case 'Entrenador personal':
          this.router.navigate(['home-ep']);
          break;
        case 'Usuario':
          this.router.navigate(['home-user']);
          break;
        default:
          this.router.navigate(['/']);
      }
    }
    else{
      this.router.navigate(['/']);
    }
  }



  getUsers() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        console.log(this.users);
      },
      (err) => console.log(err)
    );
  }

  public checkSignIn() {
    const signinData = {
      email: this.email.value,
      password: this.password.value,
    };

    this.authService.signin(signinData).subscribe(
      (res) => {
        // console.log(res.token);
        // console.log(res.userFound);

        this.storeService.addItem('user', res.userFound);
        this.storeService.addItem('token', res.token);
        this.storeService.addItem('rol', res.userFound.rol);
        this.storeService.addItem('isLogged', true);

        const rol = res.userFound.rol;

        switch (rol) {
          case 'Admin':
            this.router.navigate(['home-admin']);
            break;
          case 'Entrenador personal':
            this.router.navigate(['home-ep']);
            break;
          case 'Usuario':
            this.router.navigate(['home-user']);
            break;
          default:
            this.router.navigate(['/']);
        }


      },
      (err) => {
        this.message = err.error.message;
        console.log(err);
      }
    );
  }

  public checkSignUp() {
    console.log(this.rol.value);
    const signupData = {
      username: this.username.value,
      email: this.email2.value,
      password: this.password2.value,
      rol: this.rol.value,
    };

    this.authService.signup(signupData).subscribe(
      (res) => {
        // console.log(res.token);
        // console.log(res.savedUser);

        this.storeService.addItem('user', res.savedUser);
        this.storeService.addItem('token', res.token);
        this.storeService.addItem('rol', res.savedUser.rol);
        this.storeService.addItem('isLogged', true);

        const rol = res.savedUser.rol;

        switch (rol) {
          case 'Admin':
            this.router.navigate(['home-admin']);
            break;
          case 'Entrenador personal':
            this.router.navigate(['home-ep']);
            break;
          case 'Usuario':
            this.router.navigate(['home-user']);
            break;
          default:
            this.router.navigate(['/']);
        }

      },
      (err) => {
        this.message2 = err.error.message;
        console.log(err);
      }
    );
  }
}
