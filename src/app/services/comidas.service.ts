import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comida } from '../models/Comida';
import { StoreService } from './store.service';


@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  URL_API = 'http://localhost:4000/api/comidas';

  // URL_API = 'http://161.22.43.33:4000/api/comidas';

  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getComidas() {
    return this.http.get<Comida[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getComidaById(comidaId: string) {
    return this.http.get<Comida>(`${this.URL_API}/${comidaId}`,  { headers: {'x-access-token': this.token || null} });
  }

  getComidasByDiaSemanaDietaId(diaSemanaDietaId: string) {
    return this.http.get<Comida[]>(`${this.URL_API}/diaSemanaDieta/${diaSemanaDietaId}`,  { headers: {'x-access-token': this.token || null} });
  }

  createComida(comida: Comida) {
    return this.http.post(this.URL_API, comida);
  }

  putComida(comida: Comida) {
    return this.http.put(`${this.URL_API}/${comida._id}`, comida);
  }

  deleteComida(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
