import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { StoreService } from '../services/store.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL_API = 'http://localhost:4000/api/users';

  // URL_API = 'http://161.22.43.33:4000/api/users';


  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getUsers() {
    return this.http.get<User[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getUsersByRole(rol) {
    return this.http.get<User[]>(`${this.URL_API}/rol/${rol}`,  { headers: {'x-access-token': this.token || null} });
  }

  createUser(user: User) {
    return this.http.post(this.URL_API, user);
  }

  putUser(user: User) {
    return this.http.put(`${this.URL_API}/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
