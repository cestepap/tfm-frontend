import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Diario } from '../models/Diario';
import { StoreService } from '../services/store.service';


@Injectable({
  providedIn: 'root',
})
export class DiarioService {
  URL_API = 'http://localhost:4000/api/diarios';

  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getDiarios() {
    return this.http.get<Diario>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getDiario(diarioId: string) {
    return this.http.get<Diario>(`${this.URL_API}/${diarioId}`,  { headers: {'x-access-token': this.token || null} });
  }


  getDiarioByUserId(userId: string) {
    return this.http.get<Diario>(`${this.URL_API}/user/${userId}`,  { headers: {'x-access-token': this.token || null} });
  }

  createDiario(diario) {
    return this.http.post(this.URL_API, diario);
  }

  updateDiario(diario) {
    return this.http.put(`${this.URL_API}/${diario._id}`, diario);
  }

  deleteDiario(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
