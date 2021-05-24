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

import { Dieta } from '../../../../models/Dieta';
import { DiaSemanaDieta } from '../../../../models/DiaSemanaDieta';

import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dieta-vista-general',
  templateUrl: './dieta-vista-general.component.html',
  styleUrls: ['./dieta-vista-general.component.css'],
})
export class DietaVistaGeneralComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private dietaService: DietaService,
    private diaSemanaDietaService: DiaSemanaDietaService,
    private router: ActivatedRoute,
    private nav: Router
  ) {}

  public titulo: FormControl;
  public fechaInicio: FormControl;
  public descripcion: FormControl;

  public diasSemanaDieta: DiaSemanaDieta[];
  public dieta: Dieta = {
    idCliente: '',
    idProfesional: '',
    titulo: '',
    fechaInicio: '',
    estado: '',
    proteinasTotalesSemana: 0,
    chsTotalesSemana: 0,
    grasasTotalesSemana: 0,
    kcalTotalesSemana: 0,
    diaSemanaDieta: [],
  };

  nuevoDiaSemanaDieta: DiaSemanaDieta = {
    idDieta: '',
    nombre: '',
    descripcion: '',
    comida: [],
  };

  public dietaId: string;

  errorForm = '';
  msgForm = '';
  errorFormDiaSemana = '';
  msgFormDiaSemana = '';
  mostrarFormNuevoDiaSemana = false;

  pieChartDataNotNull = false;

  public pieChartLabels: string[] = ['Proteinas', 'Chs', 'Grasas'];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';

  public idEntrenadorPersonal: any = this.storeService.getItem(
    'idEntrenadorPersonal'
  );

  public diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  public infoCliente: any = {};

  ngOnInit(): void {
    this.getDieta();
  }

  getDieta() {
    this.dietaId = this.router.snapshot.paramMap.get('dietaId');

    console.log(this.dietaId);

    this.dietaService.getDieta(this.dietaId).subscribe(
      (res) => {
        this.dieta = res;

        this.pieChartData = [
          this.dieta.proteinasTotalesSemana,
          this.dieta.chsTotalesSemana,
          this.dieta.grasasTotalesSemana,
        ];

        console.log(this.pieChartData);
        if (this.dieta.kcalTotalesSemana > 0) this.pieChartDataNotNull = true;

        console.log(this.pieChartDataNotNull)

        console.log(this.dieta);
        this.storeService.addItem('dieta', this.dieta);
        this.storeService.addItem('dieta-infoCliente', this.dieta.idCliente);
        this.infoCliente = this.dieta.idCliente;
        console.log(this.infoCliente);
        this.getDiasSemanaDietaByDietaId();
      },
      (err) => console.log(err)
    );
  }

  getDiasSemanaDietaByDietaId() {
    this.diaSemanaDietaService
      .getDiasSemanaDietaByDietaId(this.dietaId)
      .subscribe(
        (res) => {
          this.diasSemanaDieta = res;
          console.log(this.diasSemanaDieta);
          this.storeService.addItem('diaSemanaDieta', this.diasSemanaDieta);
        },
        (err) => console.log(err)
      );
  }

  actualizarDieta(form) {
    console.log(form);

    const upadatedDieta: Dieta = {
      _id: this.dietaId,
      idCliente: this.infoCliente['_id'],
      idProfesional: this.idEntrenadorPersonal,
      titulo: form['titulo'],
      descripcion: form['descripcion'],
      fechaInicio: form['fechaInicio'],
      estado: 'Activo',
      diaSemanaDieta: [],
    };

    console.log(upadatedDieta);

    if (upadatedDieta.titulo !== '' && upadatedDieta.fechaInicio !== '') {
      console.log(upadatedDieta);

      this.dietaService.updateDieta(upadatedDieta).subscribe(
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

  deleteDiaSemana(_id) {
    console.log(_id);

    if (confirm('Are you sure to you want to delete it?')) {
      this.diaSemanaDietaService.deleteDiaSemanaDieta(_id).subscribe(
        (res) => {
          this.getDiasSemanaDietaByDietaId();
        },
        (err) => console.log(err)
      );
    }
  }

  newDiaSemanaDieta() {
    // this.nav.navigate(['dieta-dia-nueva']);
    console.log(this.mostrarFormNuevoDiaSemana);

    this.mostrarFormNuevoDiaSemana = !this.mostrarFormNuevoDiaSemana;
  }

  saveNuevoDiaSemanaDieta(form) {
    console.log(form);

    const nuevoDiaSemanaDieta: DiaSemanaDieta = {
      idDieta: this.dieta._id,
      nombre: form['nombre'],
      descripcion: form['descripcion'],
      comida: [],
    };

    if (
      nuevoDiaSemanaDieta.nombre !== '' &&
      nuevoDiaSemanaDieta.descripcion !== ''
    ) {
      console.log(nuevoDiaSemanaDieta);

      this.diaSemanaDietaService
        .createDiaSemanaDieta(nuevoDiaSemanaDieta)
        .subscribe(
          (res) => {
            console.log(res);
            this.msgFormDiaSemana = 'Dia de la dieta creado.';
            this.errorFormDiaSemana = '';
            this.getDiasSemanaDietaByDietaId();
            this.mostrarFormNuevoDiaSemana = false;
          },
          (err) => console.log(err)
        );
    } else {
      this.errorFormDiaSemana = 'Error en los campos.';
      this.msgFormDiaSemana = '';
    }
  }
}
