import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rutina } from '../models/Rutina';
import { StoreService } from '../services/store.service';


@Injectable({
  providedIn: 'root',
})
export class RutinaService {
  // URL_API = 'http://localhost:4000/api/rutinas';

  URL_API = 'http://161.22.43.33:4000/api/rutinas';


  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getRutinas() {
    return this.http.get<Rutina[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getRutina(rutinaId: string) {
    return this.http.get<Rutina>(`${this.URL_API}/${rutinaId}`,  { headers: {'x-access-token': this.token || null} });
  }


  getRutinasByIdEP(_idEP: string) {
    return this.http.get<Rutina[]>(`${this.URL_API}/ep/${_idEP}`,  { headers: {'x-access-token': this.token || null} });
  }

  getRutinasByIdCliente(_idCliente: string) {
    return this.http.get<Rutina[]>(`${this.URL_API}/user/${_idCliente}`,  { headers: {'x-access-token': this.token || null} });
  }
  
  createRutina(rutina) {
    return this.http.post(this.URL_API, rutina);
  }

  updateRutina(rutina) {
    return this.http.put(`${this.URL_API}/update/${rutina._id}`, rutina);
  }

  deleteRutina(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
