import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { StoreService } from '../../../../services/store.service';
import { ComidaService } from '../../../../services/comidas.service';
import { DetalleComidaService } from '../../../../services/detalleComida.service';
import { DietaService } from '../../../../services/dietas.service';
import { Comida } from '../../../../models/Comida';
import { DetalleComida } from '../../../../models/DetalleComida';

import { AlimentosService } from '../../../../services/alimentos.service';
import { Alimento } from '../../../../models/Alimento';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dieta-comida-edit',
  templateUrl: './dieta-comida-edit.component.html',
  styleUrls: ['./dieta-comida-edit.component.css'],
})
export class DietaComidaEditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private comidaService: ComidaService,
    private detalleComidaService: DetalleComidaService,
    private dietaService: DietaService,
    private alimentoService: AlimentosService,
    private route: ActivatedRoute,
    private nav: Router
  ) {}

  public idAlimento: FormControl;
  public nombre: FormControl;
  public cantidad: FormControl;
  public observaciones: FormControl;

  public dieta: any;
  public diaSemanaDieta: any;
  public comida: any;

  public nuevoDetalleComida: DetalleComida = {
    idComida: '',
    idAlimento: '',
    cantidad: 0,
    observaciones: '',
    proteinasDetalleComida: 0,
    chsDetalleComida: 0,
    grasasDetalleComida: 0,
    kcalDetalleComida: 0,
  };

  alimentos: Alimento[] = [
    {
      nombre: '',
      descripcion: '',
      grupoAlimento: '',
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0,
      kcal: 0,
      imagen: '',
    },
  ];

  public selectedAlimento: Alimento;

  public detalleComidaId;
  public detalleComida: DetalleComida;

  msgFormDetalleComida = '';
  errorFormDetalleComida = '';

  toggle = false;
  grupoAlimentoTitle = 'Todos los alimentos';
  nAlimento = 'Selecciona el alimento';
  nFotoAlimento = 'assets/img/alimentos/food-icon.png';

  ngOnInit(): void {
    this.dieta = this.storeService.getItem('dieta');
    this.diaSemanaDieta = this.storeService.getItem('diaSemanaDieta');
    this.comida = this.storeService.getItem('comida');
    console.log(this.dieta);

    this.detalleComidaId = this.route.snapshot.paramMap.get('detalleComidaId');

    this.getDetalleComidaById();
  }

  getDetalleComidaById() {
    this.detalleComidaService
      .getDetalleComidaById(this.detalleComidaId)
      .subscribe(
        (res) => {
          this.detalleComida = res;
          console.log(this.detalleComida);
        },
        (err) => console.log(err)
      );
  }

  editDetalleComida(form) {
    console.log(form);

    console.log(this.detalleComida.idAlimento['proteinas']);

    const nuevoDetalleComida: DetalleComida = {
      idComida: this.comida._id,
      idAlimento: this.detalleComida.idAlimento['_id'],
      cantidad: form['cantidad'],
      observaciones: form['observaciones'],
      proteinasDetalleComida:
        (this.detalleComida.idAlimento['proteinas'] * form['cantidad']) / 100,
      chsDetalleComida:
        (this.detalleComida.idAlimento['carbohidratos'] * form['cantidad']) /
        100,
      grasasDetalleComida:
        (this.detalleComida.idAlimento['grasas'] * form['cantidad']) / 100,
      kcalDetalleComida:
        (this.detalleComida.idAlimento['kcal'] * form['cantidad']) / 100,
    };

    console.log(nuevoDetalleComida);

    if (
      nuevoDetalleComida.cantidad !== 0 &&
      nuevoDetalleComida.observaciones !== ''
    ) {
      console.log(nuevoDetalleComida);

      this.detalleComidaService.putDetalleComida(this.detalleComida).subscribe(
        (res) => {
          console.log(res);

          /* SE ACTUALIZA LA DIETA CON LOS MACROS Y KCAL SEGUN LA NUEVA CANTIDAD ESTABLECIDA */
          let nuevaProteinaDieta =
            this.dieta['proteinasTotalesSemana'] -
            this.detalleComida['proteinasDetalleComida'] +
            nuevoDetalleComida['proteinasDetalleComida'];
          let nuevaCarbohidratosDieta =
            this.dieta['chsTotalesSemana'] -
            this.detalleComida['chsDetalleComida'] +
            nuevoDetalleComida['chsDetalleComida'];
          let nuevaGrasasDieta =
            this.dieta['grasasTotalesSemana'] -
            this.detalleComida['grasasDetalleComida'] +
            nuevoDetalleComida['grasasDetalleComida'];
          let nuevaKcalDieta =
            this.dieta['kcalTotalesSemana'] -
            this.detalleComida['kcalDetalleComida'] +
            nuevoDetalleComida['kcalDetalleComida'];

          this.dieta['proteinasTotalesSemana'] = nuevaProteinaDieta;
          this.dieta['chsTotalesSemana'] = nuevaCarbohidratosDieta;
          this.dieta['grasasTotalesSemana'] = nuevaGrasasDieta;
          this.dieta['kcalTotalesSemana'] = nuevaKcalDieta;

          this.dietaService.updateDieta(this.dieta).subscribe(
            (res) => {
              console.log(res);
              this.storeService.addItem('dieta', res);
            },
            (err) => console.log(err)
          );
          /* SE ACTUALIZA LA DIETA CON LOS MACROS Y KCAL SEGUN LA NUEVA CANTIDAD ESTABLECIDA */

          this.msgFormDetalleComida = 'Actualizado';
          this.errorFormDetalleComida = '';
        },
        (err) => console.log(err)
      );
      // this.router.navigate(['rutina/{{this.dieta._id}}']);
    } else {
      this.errorFormDetalleComida = 'Error en los campos.';
      this.msgFormDetalleComida = '';
    }
  }
}
