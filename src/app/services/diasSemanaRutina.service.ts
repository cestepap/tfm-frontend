import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DiaSemanaRutina } from '../models/DiaSemanaRutina';
import { StoreService } from './store.service';


@Injectable({
  providedIn: 'root',
})
export class DiaSemanaRutinaService {
  URL_API = 'http://localhost:4000/api/diasSemanaRutina';

  // URL_API = 'http://161.22.43.33:4000/api/diasSemanaRutina';


  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getDiasSemanaRutina() {
    return this.http.get<DiaSemanaRutina[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getDiaSemanaRutinaById(diaSemanaRutinaId: string) {
    return this.http.get<DiaSemanaRutina>(`${this.URL_API}/${diaSemanaRutinaId}`,  { headers: {'x-access-token': this.token || null} });
  }

  getDiasSemanaRutinaByRutinaId(rutinaId: string) {
    return this.http.get<DiaSemanaRutina[]>(`${this.URL_API}/rutina/${rutinaId}`,  { headers: {'x-access-token': this.token || null} });
  }

  createDiaSemanaRutina(diaSemanaRutina: DiaSemanaRutina) {
    return this.http.post(this.URL_API, diaSemanaRutina);
  }

  updateDiaSemanaRutina(diaSemanaRutina) {
    return this.http.put(`${this.URL_API}/update/${diaSemanaRutina._id}`, diaSemanaRutina);
  }

  deleteDiaSemanaRutina(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
