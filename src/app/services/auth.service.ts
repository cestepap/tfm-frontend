import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { CurrentUser } from '../models/currentUser';

import { Token } from '../models/token';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL_API = 'http://localhost:4000/api/auth';

  // URL_API = 'http://161.22.43.33:4000/api/auth';

  URL_API = 'http://85.208.23.197:4000/api/auth';
  
  constructor(private http: HttpClient) {}

  signin(user) {
    return this.http.post<any>(`${this.URL_API}/signin`, user);
  }

  signup(user) {
    return this.http.post<any>(`${this.URL_API}/signup`, user);
  }

}
