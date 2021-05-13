import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';

import { RutinaService } from '../../../services/rutinas.service';
import { DiaSemanaRutinaService } from '../../../services/diasSemanaRutina.service';
import { Rutina } from '../../../models/Rutina';
import { DiaSemanaRutina } from '../../../models/DiaSemanaRutina';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DetalleEjercicioService } from '../../../services/detalleEjercicio.service';
import { Ejercicio } from '../../../models/Ejercicio';
import { EjerciciosService } from '../../../services/ejercicios.service';
import { DetalleEjercicio } from '../../../models/DetalleEjercicio';

@Component({
  selector: 'app-user-rutina-detalle',
  templateUrl: './user-rutina-detalle.component.html',
  styleUrls: ['./user-rutina-detalle.component.css'],
})
export class UserRutinaDetalleComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private rutinaService: RutinaService,
    private diasSemanaRutinaService: DiaSemanaRutinaService,
    private router: ActivatedRoute,
    private nav: Router,
    private ejerciciosService: EjerciciosService,
    private detalleEjercicioService: DetalleEjercicioService
  ) {}

  public diasSemanaRutina: DiaSemanaRutina[];
  public rutina: Rutina = {
    idCliente: '',
    idProfesional: '',
    titulo: '',
    fechaInicio: '',
    estado: '',
    diasSemanaRutina: [],
  };

  public rutinaId: string;

  public ejercicios: Ejercicio[] = [
    {
      nombre: '',
      descripcion: '',
      grupoMuscular: '',
      imagen: ''
    },
  ];

  public detallesEjercicios: DetalleEjercicio[];

  public idsDiasSemanaRutina: any;

  public mostrarDetallesEjercicios = false;

  // public idEntrenadorPersonal: any = this.storeService.getItem(
  //   'idEntrenadorPersonal'
  // );

  public infoCliente: any = {};

  ngOnInit(): void {
    this.rutinaId = this.router.snapshot.paramMap.get('rutinaId');
    this.getRutinaById();
    this.getDiasSemanaRutinaByRutinaId();
    // this.getDetallesEjercicios();
  }

  getRutinaById() {
    this.rutinaService.getRutina(this.rutinaId).subscribe(
      (res) => {
        this.rutina = res;
        console.log(this.rutina);
        // this.storeService.addItem('rutina', this.rutina);
        // this.storeService.addItem('rutina-infoCliente', this.rutina.idCliente);
        this.infoCliente = this.rutina.idCliente;
        // console.log(this.infoCliente);
        // this.getDiasSemanaRutinaByRutinaId();
      },
      (err) => console.log(err)
    );
  }

  getDiasSemanaRutinaByRutinaId() {
    this.diasSemanaRutinaService
      .getDiasSemanaRutinaByRutinaId(this.rutinaId)
      .subscribe(
        (res) => {
          this.diasSemanaRutina = res;
          // this.getDetallesEjercicios(this.diasSemanaRutina['_id']);
          console.log(this.diasSemanaRutina);
        },
        (err) => console.log(err)
      );
  }

  // getDetallesEjercicios(id) {
  //   this.detalleEjercicioService.getDetallesEjerciciosByDiaSemanaRutinaId(id).subscribe(
  //     (res) => {
  //       this.detallesEjercicios = res;
  //       console.log(this.detallesEjercicios);
  //     },
  //     (err) => console.log(err)
  //   );
  // }



  // getEjercicios() {
  //   this.ejerciciosService.getEjercicios().subscribe(
  //     (res) => {
  //       this.ejercicios = res;
  //       console.log(this.ejercicios);
  //     },
  //     (err) => console.log(err)
  //   );
  // }

  mostrarDetalleEjercicios(id) {
    console.log(id);

    this.mostrarDetallesEjercicios = true;

    this.detalleEjercicioService
      .getDetallesEjerciciosByDiaSemanaRutinaId(id)
      .subscribe(
        (res) => {
          this.detallesEjercicios = res;
          console.log(this.detallesEjercicios);
        },
        (err) => console.log(err)
      );
  }

  ocultarDetallesEjercicio() {
    this.mostrarDetallesEjercicios = false;
  }
}
