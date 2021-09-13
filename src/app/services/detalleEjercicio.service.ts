import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetalleEjercicio } from '../models/DetalleEjercicio';
import { StoreService } from './store.service';


@Injectable({
  providedIn: 'root',
})
export class DetalleEjercicioService {
  URL_API = 'http://localhost:4000/api/detallesEjercicios';

  // URL_API = 'http://161.22.43.33:4000/api/detallesEjercicios';


  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getDetallesEjercicios() {
    return this.http.get<DetalleEjercicio[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getDetalleEjercicioById(diaSemanaRutinaId: string) {
    return this.http.get<DetalleEjercicio>(`${this.URL_API}/${diaSemanaRutinaId}`,  { headers: {'x-access-token': this.token || null} });
  }

  getDetallesEjerciciosByDiaSemanaRutinaId(diaSemanaRutinaId: string) {
    return this.http.get<DetalleEjercicio[]>(`${this.URL_API}/rutina/${diaSemanaRutinaId}`,  { headers: {'x-access-token': this.token || null} });
  }

  createDetalleEjercicio(detalleEjercicio: DetalleEjercicio) {
    return this.http.post(this.URL_API, detalleEjercicio);
  }

  putDetalleEjercicio(detalleEjercicio: DetalleEjercicio) {
    return this.http.put(`${this.URL_API}/${detalleEjercicio._id}`, detalleEjercicio);
  }

  deleteDetalleEjercicio(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
