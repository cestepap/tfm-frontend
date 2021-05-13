import { Injectable } from '@angular/core';
import { User } from '../models/User';
// import { CurrentUser } from '../models/currentUser';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public logged: boolean;
  public token: any;
  public user: User;

  constructor() {}

  setLoggedStatus(logged) {
    this.logged = logged;
  }

  getLoggedStatus() {
    return this.logged;
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  addItem(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    return localStorage.removeItem(key);
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
