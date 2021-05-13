import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ejercicio } from '../models/Ejercicio';
import { StoreService } from '../services/store.service';


@Injectable({
  providedIn: 'root',
})
export class EjerciciosService {
  URL_API = 'http://localhost:4000/api/ejercicios';

  public token: any = this.storeService.getItem('token');  

  // public token: any = this.storeService.getToken();
  
  constructor(private http: HttpClient, private storeService: StoreService) {}


  getEjercicios() {
    return this.http.get<Ejercicio[]>(this.URL_API,  { headers: {'x-access-token': this.token || null} });
  }

  getEjercicioById(idEjercicio: string) {
    return this.http.get<Ejercicio>(`${this.URL_API}/${idEjercicio}`,  { headers: {'x-access-token': this.token || null} });
  }

  getEjerciciosByGrupoMuscular(grupoMuscular: string) {
    return this.http.get<Ejercicio[]>(`${this.URL_API}/grupo-muscular/${grupoMuscular}`,  { headers: {'x-access-token': this.token || null} });
  }

  createEjercicio(ejercicio: Ejercicio) {
    return this.http.post(this.URL_API, ejercicio);
  }

  putEjercicio(ejercicio: Ejercicio) {
    return this.http.put(`${this.URL_API}/${ejercicio._id}`, ejercicio);
  }

  deleteEjercicio(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
