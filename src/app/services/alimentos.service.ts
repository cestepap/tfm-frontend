import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alimento } from '../models/Alimento';
import { StoreService } from '../services/store.service';


@Injectable({
  providedIn: 'root',
})
export class AlimentosService {
  URL_API = 'http://localhost:4000/api/alimentos';

  // URL_API = 'http://161.22.43.33:4000/api/alimentos';


  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getAlimentos() {
    return this.http.get<Alimento[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getAlimentoById(idAlimento: string) {
    return this.http.get<Alimento>(`${this.URL_API}/${idAlimento}`,  { headers: {'x-access-token': this.token || null} });
  }

  getAlimentosByGrupoAlimento(grupoAlimento: string) {
    return this.http.get<Alimento[]>(`${this.URL_API}/grupo-alimento/${grupoAlimento}`,  { headers: {'x-access-token': this.token || null} });
  }

  createAlimento(alimento: Alimento) {
    return this.http.post(this.URL_API, alimento);
  }

  putAlimento(alimento: Alimento) {
    console.log(alimento);
    return this.http.put(`${this.URL_API}/${alimento._id}`, alimento);
  }

  deleteAlimento(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
