import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotaDiario } from '../models/NotaDiario';
import { StoreService } from '../services/store.service';


@Injectable({
  providedIn: 'root',
})
export class NotaDiarioService {
  URL_API = 'http://localhost:4000/api/notasDiario';

  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getNotasDiario() {
    return this.http.get<NotaDiario[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getNotaDiarioById(notaDiarioId: string) {
    return this.http.get<NotaDiario>(`${this.URL_API}/${notaDiarioId}`,  { headers: {'x-access-token': this.token || null} });
  }


  getNotasDiarioByDiarioId(diarioId: string) {
    return this.http.get<NotaDiario[]>(`${this.URL_API}/diario/${diarioId}`,  { headers: {'x-access-token': this.token || null} });
  }

  createNotaDiario(notaDiario) {
    return this.http.post(this.URL_API, notaDiario);
  }

  updateNotaDiario(notaDiario) {
    return this.http.put(`${this.URL_API}/${notaDiario._id}`, notaDiario);
  }

  deleteNotaDiario(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
