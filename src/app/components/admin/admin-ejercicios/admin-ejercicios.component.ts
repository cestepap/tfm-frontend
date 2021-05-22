import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from '../../../services/ejercicios.service';
import { Ejercicio } from '../../../models/Ejercicio';
import { NgForm } from '@angular/forms';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-admin-ejercicios',
  templateUrl: './admin-ejercicios.component.html',
  styleUrls: ['./admin-ejercicios.component.css'],
})
export class AdminEjerciciosComponent implements OnInit {
  ejercicios: Ejercicio[];

  selectedEjercicio: Ejercicio = {
    nombre: '',
    descripcion: '',
    grupoMuscular: '',
    imagen: 'assets/img/ejercicios/ejercicio-icon.jpg',
  };

  lista: string[] = ['hola', 'que', 'tal', 'estas'];

  // public user: User = this.storeService.getItem('user');
  // public token: any = this.storeService.getItem('token');

  public user: any = this.storeService.getUser();
  public token: any = this.storeService.getToken();

  constructor(
    private ejerciciosService: EjerciciosService,
    private storeService: StoreService
  ) {}

  public errorForm = '';
  public msgForm = '';

  public gruposMusculares = [
    'Piernas',
    'Hombros',
    'Espalda',
    'Femoral',
    'Glúteos',
    'Abdomen',
    'Bíceps',
    'Tríceps',
    'Pectorales'
  ];

  ngOnInit(): void {
    this.getEjercicios();

    if (this.token) {
      console.log('permission granted. token saved');
    } else {
      console.log('no token saved');
    }
  }

  resetForm() {
    this.errorForm = '';
    this.msgForm = '';
    this.selectedEjercicio = {
      nombre: '',
      descripcion: '',
      grupoMuscular: '',
      imagen: 'assets/img/ejercicios/ejercicio-icon.jpg',
    };
  }

  getEjercicios() {
    this.ejerciciosService.getEjercicios().subscribe(
      (res) => {
        this.ejercicios = res;
        console.log(this.ejercicios);
      },
      (err) => console.log(err)
    );
  }

  addEjercicio(form: NgForm) {
    if (form.value._id) {
      this.ejerciciosService.putEjercicio(form.value).subscribe(
        (res) => {
          console.log(res);
          this.errorForm = '';
          this.getEjercicios();
        },
        (err) => console.log(err)
      );
    } else {
      this.ejerciciosService.createEjercicio(form.value).subscribe(
        (res) => {
          this.getEjercicios();
          form.reset();
          this.msgForm = 'Actualizado.';
        },
        (err) => console.log(err)
      );
    }
  }

  deleteEjercicio(id: string) {
    if (confirm('Are you sure to you want to delete it?')) {
      this.ejerciciosService.deleteEjercicio(id).subscribe(
        (res) => {
          console.log(id);
          this.getEjercicios();
        },
        (err) => console.log(err)
      );
    }
  }

  editEjercicio(ejercicio: Ejercicio) {
    this.selectedEjercicio = ejercicio;
  }
}
