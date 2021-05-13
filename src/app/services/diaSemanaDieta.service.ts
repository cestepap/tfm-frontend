import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DiaSemanaDieta } from '../models/DiaSemanaDieta';
import { StoreService } from './store.service';


@Injectable({
  providedIn: 'root',
})
export class DiaSemanaDietaService {
  URL_API = 'http://localhost:4000/api/diasSemanaDieta';

  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getDiasSemanaDieta() {
    return this.http.get<DiaSemanaDieta[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getDiaSemanaDietaById(diaSemanaDietaId: string) {
    return this.http.get<DiaSemanaDieta>(`${this.URL_API}/${diaSemanaDietaId}`,  { headers: {'x-access-token': this.token || null} });
  }

  getDiasSemanaDietaByDietaId(dietaId: string) {
    return this.http.get<DiaSemanaDieta[]>(`${this.URL_API}/dieta/${dietaId}`,  { headers: {'x-access-token': this.token || null} });
  }

  createDiaSemanaDieta(diaSemanaDieta: DiaSemanaDieta) {
    return this.http.post(this.URL_API, diaSemanaDieta);
  }

  updateDiaSemanaDieta(diaSemanaDieta) {
    return this.http.put(`${this.URL_API}/update/${diaSemanaDieta._id}`, diaSemanaDieta);
  }

  deleteDiaSemanaDieta(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
