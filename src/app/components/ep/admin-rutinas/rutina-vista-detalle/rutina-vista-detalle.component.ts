import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { StoreService } from '../../../../services/store.service';
import { RutinaService } from '../../../../services/rutinas.service';
import { DiaSemanaRutinaService } from '../../../../services/diasSemanaRutina.service';
import { DetalleEjercicioService } from '../../../../services/detalleEjercicio.service';
import { Ejercicio } from '../../../../models/Ejercicio';
import { EjerciciosService } from '../../../../services/ejercicios.service';
import { DiaSemanaRutina } from '../../../../models/DiaSemanaRutina';
import { DetalleEjercicio } from '../../../../models/DetalleEjercicio';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rutina-vista-detalle',
  templateUrl: './rutina-vista-detalle.component.html',
  styleUrls: ['./rutina-vista-detalle.component.css'],
})
export class RutinaVistaDetalleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private rutinaService: RutinaService,
    private ejerciciosService: EjerciciosService,
    private diaSemanaRutinaService: DiaSemanaRutinaService,
    private detalleEjercicioService: DetalleEjercicioService,
    private route: ActivatedRoute,
    private nav: Router
  ) {}

  public titulo: FormControl;
  public fechaInicio: FormControl;
  public descripcion: FormControl;

  public nombre: FormControl;
  public descripcionDia: FormControl;

  public diaSemanaRutinaId: string;
  public diaSemanaRutina: DiaSemanaRutina;
  public detallesEjercicios: DetalleEjercicio[];

  public series: FormControl;
  public repeticiones: FormControl;
  public observaciones: FormControl;
  public idEjercicio: FormControl;

  public rutina: any;

  public ejercicios: Ejercicio[] = [
    {
      nombre : '',
      descripcion : '',
      grupoMuscular : '',
      imagen: ''
    },
  ];

  public nuevoDetalleEjercicio: DetalleEjercicio = {
    idDiaSemanaRutina: '',
    idEjercicio: '',
    series: '',
    repeticiones: '',
    observaciones: '',
  };

  toggle = false;
  grupoMuscularTitle = 'Todos los ejercicios';
  nEjercicio = 'Selecciona un ejercicio de la lista';
  nFotoEjercicio = 'assets/img/ejercicios/ejercicio-icon.jpg';


  public infoCliente: any = this.storeService.getItem('rutina-infoCliente');

  errorForm = '';
  msgForm = '';
  errorFormNuevoDetalleEjercicio = '';
  msgFormNuevoDetalleEjercicio = '';
  mostrarFormNuevoEjercicio = false;


  ngOnInit(): void {
    this.diaSemanaRutinaId = this.route.snapshot.paramMap.get(
      'diaSemanaRutinaId'
    );
    this.getRutina();
    this.getDiaSemanaRutinaById();
    this.getDetallesEjercicios();
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

  getRutina() {
    this.rutina = this.storeService.getItem('rutina');
    console.log(this.rutina);
  }

  getDiaSemanaRutinaById() {
    this.diaSemanaRutinaService
      .getDiaSemanaRutinaById(this.diaSemanaRutinaId)
      .subscribe(
        (res) => {
          this.diaSemanaRutina = res;
          console.log(this.diaSemanaRutina);
          this.storeService.addItem('diaSemanaRutina', this.diaSemanaRutina);
        },
        (err) => console.log(err)
      );
  }

  getDetallesEjercicios() {
    this.detalleEjercicioService
      .getDetallesEjerciciosByDiaSemanaRutinaId(this.diaSemanaRutinaId)
      .subscribe(
        (res) => {
          this.detallesEjercicios = res;
          console.log(this.detallesEjercicios);
        },
        (err) => console.log(err)
      );
  }

  editarDiaSemanaRutina(form) {
    console.log(form);

    const updateDiaSemanaRutina = {
      _id: this.diaSemanaRutinaId,
      idRutina: this.rutina._id,
      descripcion: form['descripcion'],
    };

    if (updateDiaSemanaRutina.descripcion !== '') {
      console.log(updateDiaSemanaRutina);

      this.diaSemanaRutinaService
        .updateDiaSemanaRutina(updateDiaSemanaRutina)
        .subscribe(
          (res) => {
            console.log(res);
            this.msgForm = 'Actualizado.';
            this.errorForm = '';
          },
          (err) => console.log(err)
        );
    } else {
      this.errorForm = 'Error en los campos.';
      this.msgForm = '';
    }
  }

  eliminarEjercicio(_id) {
    console.log(_id);

    if (confirm('Estás seguro que quieres eliminarlo?')) {
      this.detalleEjercicioService.deleteDetalleEjercicio(_id).subscribe(
        (res) => {
          this.getDetallesEjercicios();
        },
        (err) => console.log(err)
      );
    }
  }

  nuevoEjercicio(){
    // this.nav.navigate(['rutina-ejercicio-nuevo']);
    this.mostrarFormNuevoEjercicio = !this.mostrarFormNuevoEjercicio;
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
            // this.msgFormNuevoDetalleEjercicio = 'Ejercicio creado.';
            this.errorFormNuevoDetalleEjercicio = '';
            this.getDetallesEjercicios();
            this.resetFormNuevoEjercicio();
            this.mostrarFormNuevoEjercicio = false;
          },
          (err) => console.log(err)
        );
      // this.router.navigate(['rutina/{{this.rutina._id}}']);
    } else {
      this.errorFormNuevoDetalleEjercicio = 'Error en los campos.';
      this.msgFormNuevoDetalleEjercicio = '';
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
        this.nFotoEjercicio = res['imagen'];
      },
      (err) => console.log(err)
    );

  }

  resetFormNuevoEjercicio(){
    this.nEjercicio = "";
    this.nuevoDetalleEjercicio.series = '';
    this.nuevoDetalleEjercicio.repeticiones = '';
    this.nuevoDetalleEjercicio.observaciones = '';
  }


}
