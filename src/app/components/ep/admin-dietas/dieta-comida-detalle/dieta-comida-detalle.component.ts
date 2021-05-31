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
  selector: 'app-dieta-comida-detalle',
  templateUrl: './dieta-comida-detalle.component.html',
  styleUrls: ['./dieta-comida-detalle.component.css'],
})
export class DietaComidaDetalleComponent implements OnInit {
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

  // public cantidad: FormControl;
  // public observaciones: FormControl;

  public comida: Comida = {
    idDiaSemanaDieta: '',
    nombre: '',
    hora: '',
    detalleComida: [],
  };

  public detallesComida: DetalleComida[];

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

  // public selected = 'Listado';

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

  public comidaId;
  public dieta: any;
  public diaSemanaDieta: any;

  errorFormAlimento = '';
  msgFormAlimento = '';
  errorFormComida = '';
  msgFormComida = '';
  msgFormNuevoDetalleComida = '';
  errorFormNuevoDetalleComida = '';

  mostrarFormNuevoAlimento = false;
  alimentoIsSelected = false;

  toggle = false;
  grupoAlimentoTitle = 'Todos los alimentos';
  nAlimento = 'Selecciona un alimento de la lista';
  nFotoAlimento = 'assets/img/alimentos/food-icon.png';

  ngOnInit(): void {
    this.dieta = this.storeService.getItem('dieta');
    this.diaSemanaDieta = this.storeService.getItem('diaSemanaDieta');
    this.comidaId = this.route.snapshot.paramMap.get('comidaId');

    this.getComidaById();
    this.getDetalleComidaByComidaId();
    this.getAlimentos();
  }

  getAlimentos() {
    this.alimentoService.getAlimentos().subscribe(
      (res) => {
        this.alimentos = res;
        console.log(this.alimentos);
      },
      (err) => console.log(err)
    );
  }

  filtrarGrupoAlimento(grupoAlimento) {
    this.grupoAlimentoTitle = 'Listado de alimentos de ' + grupoAlimento;

    this.alimentoService.getAlimentosByGrupoAlimento(grupoAlimento).subscribe(
      (res) => {
        this.alimentos = res;
        console.log(this.alimentos);
      },
      (err) => console.log(err)
    );
  }

  nombreAlimento(e) {
    this.alimentoIsSelected = true;

    this.alimentoService.getAlimentoById(e.value).subscribe(
      (res) => {
        this.nAlimento = res['nombre'];
        this.nFotoAlimento = res['imagen'];
        this.selectedAlimento = res;
      },
      (err) => console.log(err)
    );
  }

  getComidaById() {
    this.comidaService.getComidaById(this.comidaId).subscribe(
      (res) => {
        this.comida = res;
        console.log(this.comida);
        this.storeService.addItem('comida', this.comida);
      },
      (err) => console.log(err)
    );
  }

  editComida(form) {
    const updatedComida = {
      _id: this.comida['_id'],
      idDiaSemanaDieta: this.diaSemanaDieta['_id'],
      nombre: form['nombre'],
      hora: form['hora'],
      detalleComida: [],
    };

    console.log(updatedComida);

    if (updatedComida.nombre !== '' && updatedComida.hora !== '') {
      console.log(updatedComida);

      this.comidaService.putComida(updatedComida).subscribe(
        (res) => {
          console.log(res);
          this.msgFormComida = 'Actualizado.';
          this.errorFormComida = '';
          // this.getDetallesEjercicio();
        },
        (err) => console.log(err)
      );
    } else {
      this.errorFormComida = 'Error en los campos.';
      this.msgFormComida = '';
    }
  }

  showFormNuevoAlimento() {
    this.mostrarFormNuevoAlimento = !this.mostrarFormNuevoAlimento;
  }

  getDetalleComidaByComidaId() {
    this.detalleComidaService
      .getDetallesComidaByComidaId(this.comidaId)
      .subscribe(
        (res) => {
          this.detallesComida = res;
          console.log(this.detallesComida);
        },
        (err) => console.log(err)
      );
  }

  updateDetalleComida(detalleComida) {
    console.log(detalleComida);
  }

  deleteDetalleComida(detalleComida) {
    if (confirm('Estás seguro que quieres eliminarlo?')) {
      this.detalleComidaService
        .deleteDetalleComida(detalleComida._id)
        .subscribe(
          (res) => {
            this.updateDieta(detalleComida, 'resta');
            this.getDetalleComidaByComidaId();
          },
          (err) => console.log(err)
        );
    }
  }

  guardarNuevoDetalleComida(form) {
    console.log(form);

    const nuevoDetalleComida: DetalleComida = {
      idComida: this.comidaId,
      idAlimento: form['idAlimento'],
      cantidad: form['cantidad'],
      observaciones: form['observaciones'],
      proteinasDetalleComida:
        (this.selectedAlimento.proteinas * this.nuevoDetalleComida.cantidad) /
        100,
      chsDetalleComida:
        (this.selectedAlimento.carbohidratos *
          this.nuevoDetalleComida.cantidad) /
        100,
      grasasDetalleComida:
        (this.selectedAlimento.grasas * this.nuevoDetalleComida.cantidad) / 100,
      kcalDetalleComida:
        (this.selectedAlimento.kcal * this.nuevoDetalleComida.cantidad) / 100,
    };

    if (
      nuevoDetalleComida.cantidad != 0 &&
      nuevoDetalleComida.cantidad > 0 &&
      nuevoDetalleComida.idAlimento !== ''
    ) {
      console.log(nuevoDetalleComida);

      this.detalleComidaService
        .createDetalleComida(nuevoDetalleComida)
        .subscribe(
          (res) => {
            console.log(res);

            this.updateDieta(nuevoDetalleComida, 'suma');
            this.errorFormNuevoDetalleComida = '';
            this.getDetalleComidaByComidaId();
            this.resetFormNuevoDetalleComida();
            this.mostrarFormNuevoAlimento = false;
          },
          (err) => console.log(err)
        );
      // this.router.navigate(['rutina/{{this.dieta._id}}']);
    } else {
      this.errorFormNuevoDetalleComida = 'Error en los campos.';
      this.msgFormNuevoDetalleComida = '';
    }
  }

  updateDieta(nuevoDetalleComida, op) {
    console.log(nuevoDetalleComida);
    console.log(this.dieta);

    if (op === 'suma') {
      this.dieta['proteinasTotalesSemana'] +=
        nuevoDetalleComida['proteinasDetalleComida'];
      this.dieta['chsTotalesSemana'] += nuevoDetalleComida['chsDetalleComida'];
      this.dieta['grasasTotalesSemana'] +=
        nuevoDetalleComida['grasasDetalleComida'];
      this.dieta['kcalTotalesSemana'] +=
        nuevoDetalleComida['kcalDetalleComida'];
    } else {
      this.dieta['proteinasTotalesSemana'] -=
        nuevoDetalleComida['proteinasDetalleComida'];
      this.dieta['chsTotalesSemana'] -= nuevoDetalleComida['chsDetalleComida'];
      this.dieta['grasasTotalesSemana'] -=
        nuevoDetalleComida['grasasDetalleComida'];
      this.dieta['kcalTotalesSemana'] -=
        nuevoDetalleComida['kcalDetalleComida'];
    }

    console.log(this.dieta);
    this.dietaService.updateDieta(this.dieta).subscribe(
      (res) => {
        console.log(res);
        this.storeService.addItem('dieta', res);
      },
      (err) => console.log(err)
    );
  }

  resetFormNuevoDetalleComida() {
    this.nAlimento = '';
    this.nuevoDetalleComida.cantidad = 0;
    this.nuevoDetalleComida.observaciones = '';
    this.nFotoAlimento = 'assets/img/alimentos/food-icon.png';
    this.grupoAlimentoTitle = 'Todos los ejercicios';
  }
}
