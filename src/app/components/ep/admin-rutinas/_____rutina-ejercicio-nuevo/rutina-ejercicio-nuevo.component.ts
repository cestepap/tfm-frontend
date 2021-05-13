import { Component, OnInit } from '@angular/core';
import { Ejercicio } from '../../../../models/Ejercicio';
import { EjerciciosService } from '../../../../services/ejercicios.service';
import { DetalleEjercicioService } from '../../../../services/detalleEjercicio.service';
import { DetalleEjercicio } from '../../../../models/DetalleEjercicio';
import { StoreService } from '../../../../services/store.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rutina-ejercicio-nuevo',
  templateUrl: './rutina-ejercicio-nuevo.component.html',
  styleUrls: ['./rutina-ejercicio-nuevo.component.css'],
})
export class RutinaEjercicioNuevoComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private ejerciciosService: EjerciciosService,
    private detalleEjercicioService: DetalleEjercicioService,
    private router: Router
  ) {}

  public series: FormControl;
  public repeticiones: FormControl;
  public observaciones: FormControl;
  public idEjercicio: FormControl;

  public diaSemanaRutina: any = this.storeService.getItem('diaSemanaRutina');

  nuevoDetalleEjercicio: DetalleEjercicio = {
    idDiaSemanaRutina: '',
    idEjercicio: '',
    series: '',
    repeticiones: '',
    observaciones: '',
  };

  ejercicios: Ejercicio[] = [
    {
      nombre : '',
      descripcion : '',
      gruposMusculares : '',
    },
  ];

  errorForm = '';
  msgForm = '';

  toggle = false;
  grupoMuscularTitle = 'Todos los ejercicios';
  nEjercicio = 'Selecciona el ejercicio';

  ngOnInit(): void {
    this.getEjercicios();
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

  saveDetalleEjercicio(form) {
    console.log(form);

    const nuevoDetalleEjercicio: DetalleEjercicio = {
      idDiaSemanaRutina: this.diaSemanaRutina._id,
      idEjercicio: form['idEjercicio'],
      series: form['series'],
      repeticiones: form['repeticiones'],
      observaciones: form['observaciones'],
    };

    console.log(nuevoDetalleEjercicio);

    if (
      nuevoDetalleEjercicio.series !== '' &&
      nuevoDetalleEjercicio.repeticiones !== '' &&
      nuevoDetalleEjercicio.idEjercicio !== ''
    ) {
      console.log(nuevoDetalleEjercicio);

      this.detalleEjercicioService
        .createDetalleEjercicio(nuevoDetalleEjercicio)
        .subscribe(
          (res) => {
            console.log(res);
            this.msgForm = 'Ejercicio creado.';
            this.errorForm = '';
          },
          (err) => console.log(err)
        );
      // this.router.navigate(['rutina/{{this.rutina._id}}']);
    } else {
      this.errorForm = 'Error en los campos.';
      this.msgForm = '';
    }
  }

  filtrarGrupoMuscular(grupoMuscular) {
    this.grupoMuscularTitle = 'Listado de ejercicios de ' + grupoMuscular;

    this.ejerciciosService
      .getEjerciciosByGrupoMuscular(grupoMuscular)
      .subscribe(
        (res) => {
          this.ejercicios = res;
          console.log(this.ejercicios);
        },
        (err) => console.log(err)
      );
  }

  nombreEjercicio(e) {
    // this.nEjercicio = e.value;
    console.log(e);

    this.ejerciciosService.getEjercicioById(e.value).subscribe(
      (res) => {
        this.nEjercicio = res['nombre'];
        // console.log(this.ejercicios);
      },
      (err) => console.log(err)
    );

  }
}
