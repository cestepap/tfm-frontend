import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Dieta } from '../../../models/Dieta';
import { DiaSemanaDieta } from '../../../models/DiaSemanaDieta';
import { Comida } from '../../../models/Comida';
import { DetalleComida } from '../../../models/DetalleComida';
import { DietaService } from '../../../services/dietas.service';
import { DiaSemanaDietaService } from '../../../services/diaSemanaDieta.service';
import { ComidaService } from '../../../services/comidas.service';
import { DetalleComidaService } from '../../../services/detalleComida.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dieta-dia',
  templateUrl: './user-dieta-dia.component.html',
  styleUrls: ['./user-dieta-dia.component.css'],
})
export class UserDietaDiaComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private dietaService: DietaService,
    private diaSemanaDietaService: DiaSemanaDietaService,
    private route: ActivatedRoute,
    private nav: Router,
    private detalleComidaService: DetalleComidaService,
    private comidaService: ComidaService
  ) {}

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

  public diaSemanaDietaId: string;

  public comidas: Comida[];

  public detallesComida: DetalleComida[];

  public dietaId: string;

  public idEntrenadorPersonal: any = this.storeService.getItem(
    'idEntrenadorPersonal'
  );

  public infoCliente: any = this.storeService.getItem('dieta-infoCliente');

  public mostrarDivDetalleComida = false;

  ngOnInit(): void {
    this.diaSemanaDietaId = this.route.snapshot.paramMap.get(
      'diaSemanaDietaId'
    );
    console.log(this.diaSemanaDietaId);
    this.getDieta();
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

  getComidas() {
    this.comidaService
      .getComidasByDiaSemanaDietaId(this.diaSemanaDietaId)
      .subscribe(
        (res) => {
          this.comidas = res;
          console.log(this.comidas);
          // this.getDetallesComida();
        },
        (err) => console.log(err)
      );
  }

  mostrarDetallesComida(id){
  console.log(id)
  this.mostrarDetalleComida(id)
  this.mostrarDivDetalleComida = true;
  }
  
  mostrarDetalleComida(id){
    this.detalleComidaService
      .getDetallesComidaByComidaId(id)
      .subscribe(
        (res) => {
          this.detallesComida = res;
          console.log(this.detallesComida);
        },
        (err) => console.log(err)
      );
  }

  ocultarDetallesComida() {
    this.mostrarDivDetalleComida = false;
  }

}
