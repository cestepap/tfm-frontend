import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetalleComida } from '../models/DetalleComida';
import { StoreService } from './store.service';


@Injectable({
  providedIn: 'root',
})
export class DetalleComidaService {
  URL_API = 'http://localhost:4000/api/detallesComidas';

  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getDetallesComida() {
    return this.http.get<DetalleComida[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getDetalleComidaById(detalleComidaId: string) {
    return this.http.get<DetalleComida>(`${this.URL_API}/${detalleComidaId}`,  { headers: {'x-access-token': this.token || null} });
  }

  getDetallesComidaByComidaId(comidaId: string) {
    return this.http.get<DetalleComida[]>(`${this.URL_API}/comida/${comidaId}`,  { headers: {'x-access-token': this.token || null} });
  }

  createDetalleComida(detalleComida: DetalleComida) {
    return this.http.post(this.URL_API, detalleComida);
  }

  putDetalleComida(detalleComida: DetalleComida) {
    return this.http.put(`${this.URL_API}/${detalleComida._id}`, detalleComida);
  }

  deleteDetalleComida(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
