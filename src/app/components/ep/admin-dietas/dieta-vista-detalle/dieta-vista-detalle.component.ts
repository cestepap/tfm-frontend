import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { StoreService } from '../../../../services/store.service';
import { DietaService } from '../../../../services/dietas.service';
import { DiaSemanaDietaService } from '../../../../services/diaSemanaDieta.service';
import { ComidaService } from '../../../../services/comidas.service';
import { DiaSemanaDieta } from '../../../../models/DiaSemanaDieta';
import { Comida } from '../../../../models/Comida';
import { DetalleComidaService } from '../../../../services/detalleComida.service';
import { DetalleComida } from '../../../../models/DetalleComida';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dieta-vista-detalle',
  templateUrl: './dieta-vista-detalle.component.html',
  styleUrls: ['./dieta-vista-detalle.component.css'],
})
export class DietaVistaDetalleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private dietaService: DietaService,
    private diaSemanaDietaService: DiaSemanaDietaService,
    private detalleComidaService: DetalleComidaService,
    private comidaService: ComidaService,
    private route: ActivatedRoute,
    private nav: Router
  ) {}

  public titulo: FormControl;
  public fechaInicio: FormControl;
  public descripcion: FormControl;

  public nombreDia: FormControl;
  public descripcionDia: FormControl;

  public diaSemanaDietaId: string;
  public diaSemanaDieta: DiaSemanaDieta = {
    idDieta: '',
    nombre: '',
    descripcion: '',
    proteinasTotalesDia: 0,
    grasasTotalesDia: 0,
    chsTotalesDia: 0,
    kcalTotalesDia: 0,
    comida: [''],
  };

  public nuevaComida: Comida = {
    idDiaSemanaDieta: '',
    nombre: '',
    hora: '',
    proteinasComida: 0,
    chsComida: 0,
    grasasComida: 0,
    kcalComida: 0,
    detalleComida: [],
  };

  public detallesComida: DetalleComida[];

  public comidas: Comida[];

  public dieta: any;

  public infoCliente: any = this.storeService.getItem('dieta-infoCliente');

  errorForm = '';
  msgForm = '';
  errorFormComida = '';
  msgFormComida = '';

  mostrarFormNuevaComida = false;

  pieChartDataNotNull = false;

  public pieChartLabels: string[] = ['Proteinas', 'Carbohidratos', 'Grasas'];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';

  ngOnInit(): void {
    this.diaSemanaDietaId = this.route.snapshot.paramMap.get(
      'diaSemanaDietaId'
    );
    this.getDieta();
    this.pieChartData = [
      this.dieta.proteinasTotalesSemana,
      this.dieta.chsTotalesSemana,
      this.dieta.grasasTotalesSemana,
    ];

    console.log(this.pieChartData);


    if (this.pieChartData[0] === 0) this.pieChartDataNotNull = true;

    this.getDiaSemanaDietaById();
    this.getComidas();
  }

  getDieta() {
    this.dieta = this.storeService.getItem('dieta');
    console.log(this.dieta);
  }

  getDiaSemanaDietaById() {
    this.diaSemanaDietaService
      .getDiaSemanaDietaById(this.diaSemanaDietaId)
      .subscribe(
        (res) => {
          this.diaSemanaDieta = res;
          console.log(this.diaSemanaDieta);
          this.storeService.addItem('diaSemanaDieta', this.diaSemanaDieta);
        },
        (err) => console.log(err)
      );
  }

  editarDiaSemanaDieta(form) {
    console.log(form);

    const updateDiaSemanaDieta = {
      _id: this.diaSemanaDietaId,
      idDieta: this.dieta._id,
      descripcion: form['descripcion'],
    };

    // if (updateDiaSemanaDieta.descripcion !== '') {
      console.log(updateDiaSemanaDieta);

      this.diaSemanaDietaService
        .updateDiaSemanaDieta(updateDiaSemanaDieta)
        .subscribe(
          (res) => {
            console.log(res);
            this.msgForm = 'Actualizado.';
            this.errorForm = '';
          },
          (err) => console.log(err)
        );
    // } else {
    //   this.errorForm = 'Error en los campos.';
    //   this.msgForm = '';
    // }
  }

  getComidas() {
    this.comidaService
      .getComidasByDiaSemanaDietaId(this.diaSemanaDietaId)
      .subscribe(
        (res) => {
          this.comidas = res;
          console.log(this.comidas);
        },
        (err) => console.log(err)
      );
  }

  resetNuevaComida(){
    this.errorFormComida = '';
    this.msgFormComida = '';
    this.nuevaComida = {
      idDiaSemanaDieta: '',
      nombre: '',
      hora: '',
      proteinasComida: 0,
      chsComida: 0,
      grasasComida: 0,
      kcalComida: 0,
      detalleComida: [],
    }
  }

  eliminarComida(_id) {
    console.log(_id);

    if (confirm('Estás seguro que quieres eliminarlo?')) {
      this.comidaService.deleteComida(_id).subscribe(
        (res) => {
          this.getComidas();
        },
        (err) => console.log(err)
      );
    }
  }

  showFormNuevaComida() {
    // this.nav.navigate(['dieta-comida-nueva']);

    this.mostrarFormNuevaComida = !this.mostrarFormNuevaComida;
  }

  guardarNuevaComida(form) {
    console.log(form);

    const nuevaComida: Comida = {
      idDiaSemanaDieta: this.diaSemanaDietaId,
      nombre: form['nombre'],
      hora: form['hora'],
      detalleComida: [],
    };

    if (nuevaComida.nombre !== '' && nuevaComida.hora !== '') {
      console.log(nuevaComida);

      this.comidaService.createComida(nuevaComida).subscribe(
        (res) => {
          console.log(res);
          this.errorFormComida = 'Dia de la dieta creado.';
          this.msgFormComida = '';
          this.getComidas();
          this.resetNuevaComida();
          this.mostrarFormNuevaComida = false;
        },
        (err) => console.log(err)
      );
    } else {
      this.errorFormComida = 'Error en los campos.';
      this.msgFormComida = '';
    }
  }

  // public chartClicked(e: any): void {
  //   console.log(e);
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }
}
