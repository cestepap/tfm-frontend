import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { CurrentUser } from '../models/currentUser';

import { Token } from '../models/token';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL_API = 'http://localhost:4000/api/auth';
  
  constructor(private http: HttpClient) {}

  signin(user) {
    return this.http.post<any>(`${this.URL_API}/signin`, user);
  }

  signup(user) {
    return this.http.post<any>(`${this.URL_API}/signup`, user);
  }

}
