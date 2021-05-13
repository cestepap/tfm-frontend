import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dieta } from '../models/Dieta';
import { StoreService } from '../services/store.service';


@Injectable({
  providedIn: 'root',
})
export class DietaService {
  URL_API = 'http://localhost:4000/api/dietas';

  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getDietas() {
    return this.http.get<Dieta[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getDieta(dietaId: string) {
    return this.http.get<Dieta>(`${this.URL_API}/${dietaId}`,  { headers: {'x-access-token': this.token || null} });
  }


  getDietasByIdEP(_idEP: string) {
    return this.http.get<Dieta[]>(`${this.URL_API}/ep/${_idEP}`,  { headers: {'x-access-token': this.token || null} });
  }

  getDietasByIdCliente(_idCliente: string) {
    return this.http.get<Dieta[]>(`${this.URL_API}/user/${_idCliente}`,  { headers: {'x-access-token': this.token || null} });
  }


  createDieta(dieta) {
    return this.http.post(this.URL_API, dieta);
  }

  updateDieta(dieta) {
    return this.http.put(`${this.URL_API}/update/${dieta._id}`, dieta);
  }

  deleteDieta(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
