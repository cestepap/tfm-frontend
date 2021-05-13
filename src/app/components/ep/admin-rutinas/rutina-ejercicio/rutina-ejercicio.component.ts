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
import { EjerciciosService } from '../../../../services/ejercicios.service';

import { Rutina } from '../../../../models/Rutina';
import { DiaSemanaRutina } from '../../../../models/DiaSemanaRutina';
import { DetalleEjercicio } from '../../../../models/DetalleEjercicio';
import { Ejercicio } from '../../../../models/Ejercicio';

import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rutina-vista-detalle',
  templateUrl: './rutina-ejercicio.component.html',
  styleUrls: ['./rutina-ejercicio.component.css'],
})
export class RutinaEjercicioComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private rutinaService: RutinaService,
    private diasSemanaRutinaService: DiaSemanaRutinaService,
    private detalleEjercicioService: DetalleEjercicioService,
    private ejerciciosService: EjerciciosService,
    private route: ActivatedRoute
  ) {}

  public titulo: FormControl;
  public fechaInicio: FormControl;
  public descripcion: FormControl;

  public series: FormControl;
  public repeticiones: FormControl;
  public observaciones: FormControl;

  public rutina: any;
  public diaSemanaRutina: any;
  public ejercicioId: any;
  public detalleEjercicio: any;

  ejercicio: Ejercicio;

  errorForm = '';
  msgForm = '';

  public infoCliente: any = this.storeService.getItem('rutina-infoCliente');


  ngOnInit(): void {
    this.ejercicioId = this.route.snapshot.paramMap.get(
      'ejercicioId'
    );
    this.rutina = this.storeService.getItem('rutina');
    this.diaSemanaRutina = this.storeService.getItem('diaSemanaRutina');
    this.getDetallesEjercicio();
  }


  getDetallesEjercicio() {
    this.detalleEjercicioService
      .getDetalleEjercicioById(this.ejercicioId)
      .subscribe(
        (res) => {
          this.detalleEjercicio = res;
          console.log(this.detalleEjercicio);
          this.storeService.addItem('detalleEjercicio', this.detalleEjercicio);
          console.log("1");
        },
        (err) => console.log(err)
      );
  }

  // getInfoEjercicio(idEjercicio){
  //   this.ejerciciosService.getEjercicioById(idEjercicio).subscribe(
  //     (res) => {
  //       this.ejercicio = res;
  //       console.log(this.ejercicio);
  //     },
  //     (err) => console.log(err)
  //   );
  // }
  
  editEjercicio(form: NgForm) {

    const updatedEjercicio = {
      _id: form['_id'],
      idDiaSemanaRutina: form['idDiaSemanaRutina'],
      idEjercicio: form['idEjercicio']._id, 
      series: form['series'],
      repeticiones: form['repeticiones'],
      observaciones: form['observaciones']

    }

    if ((updatedEjercicio.series !== '') && (updatedEjercicio.repeticiones !== '')) {
      console.log(updatedEjercicio);

      this.detalleEjercicioService.putDetalleEjercicio(updatedEjercicio).subscribe(
        (res) => {
          console.log(res);
          this.msgForm = 'Actualizado.';
          this.errorForm = '';
          // this.getDetallesEjercicio();
        },
        (err) => console.log(err)
      );
    } else {
      this.errorForm = 'Error en los campos.';
      this.msgForm = '';
    }


  }

  eliminarEjercicio(ejercicio){
    console.log(ejercicio);
  }
}
