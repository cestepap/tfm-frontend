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
  selector: 'app-user-dieta-detalle',
  templateUrl: './user-dieta-detalle.component.html',
  styleUrls: ['./user-dieta-detalle.component.css'],
})
export class UserDietaDetalleComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private dietaService: DietaService,
    private diaSemanaDietaService: DiaSemanaDietaService,
    private router: ActivatedRoute,
    private nav: Router,
    private detalleComidaService: DetalleComidaService,
    private comidaService: ComidaService,
  ) {}

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


  public comidas: Comida[];

  public dietaId: string;


  pieChartDataNotNull = false;

  public pieChartLabels: string[] = ['Proteinas', 'Carbohidratos', 'Grasas'];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';

  public idEntrenadorPersonal: any = this.storeService.getItem(
    'idEntrenadorPersonal'
  );

  public diasSemana = [
    'Luness',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  public infoCliente: any = {};

  public mostrarDetallesComidas = false;


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

        if (this.dieta.kcalTotalesSemana > 0) this.pieChartDataNotNull = true;

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

  mostrarDetalleComidas(id){
    console.log(id)
    this.getComidas(id)

  }

  getComidas(id) {
    this.comidaService
      .getComidasByDiaSemanaDietaId(id)
      .subscribe(
        (res) => {
          this.comidas = res;
          console.log(this.comidas);
          // this.getDetallesComida();
        },
        (err) => console.log(err)
      );
  }

  
  ocultarDetallesEjercicio() {
    this.mostrarDetallesComidas = false;
  }
}
