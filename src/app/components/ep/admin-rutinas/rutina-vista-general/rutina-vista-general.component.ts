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
import { Rutina } from '../../../../models/Rutina';
import { DiaSemanaRutina } from '../../../../models/DiaSemanaRutina';

import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rutina-vista-general',
  templateUrl: './rutina-vista-general.component.html',
  styleUrls: ['./rutina-vista-general.component.css'],
})
export class RutinaVistaGeneralComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private rutinaService: RutinaService,
    private diasSemanaRutinaService: DiaSemanaRutinaService,
    private router: ActivatedRoute,
    private nav: Router
  ) {}

  public titulo: FormControl;
  public fechaInicio: FormControl;
  public descripcion: FormControl;

  public diasSemanaRutina: DiaSemanaRutina[];
  public rutina: Rutina = {
    idCliente: '',
    idProfesional: '',
    titulo: '',
    fechaInicio: '',
    estado: '',
    diasSemanaRutina: []
  };
  public rutinaId: string;

  nuevoDiaSemanaRutina: DiaSemanaRutina = {
    idRutina: '',
    nombre: '',
    descripcion: '',
    detalleEjercicios: [],
  };

  errorForm = '';
  msgForm = '';
  errorFormDiaSemana = '';
  msgFormDiaSemana = '';
  mostrarFormNuevoDiaSemana = false;

  public diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  public idEntrenadorPersonal: any = this.storeService.getItem(
    'idEntrenadorPersonal'
  );

  public infoCliente: any = {};

  ngOnInit(): void {
    this.getRutina();
  }

  getRutina() {
    this.rutinaId = this.router.snapshot.paramMap.get('rutinaId');
    this.rutinaService.getRutina(this.rutinaId).subscribe(
      (res) => {
        this.rutina = res;
        console.log(this.rutina);
        this.storeService.addItem('rutina', this.rutina);
        this.storeService.addItem('rutina-infoCliente', this.rutina.idCliente);
        this.infoCliente = this.rutina.idCliente;
        console.log(this.infoCliente);
        this.getDiasSemanaRutinaByRutinaId();
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
          console.log(this.diasSemanaRutina);
          this.storeService.addItem('diaSemanaRutina', this.diasSemanaRutina);
        },
        (err) => console.log(err)
      );
  }

  actualizarRutina(form) {
    console.log(form);

    const updatedRutina: Rutina = {
      _id: this.rutinaId,
      idCliente: this.infoCliente['_id'],
      idProfesional: this.idEntrenadorPersonal,
      titulo: form['titulo'],
      descripcion: form['descripcion'],
      fechaInicio: form['fechaInicio'],
      estado: 'Activo',
      diasSemanaRutina: [],
    };

    console.log(updatedRutina);

    if (updatedRutina.titulo !== '' && updatedRutina.fechaInicio !== '') {
      console.log(updatedRutina);

      this.rutinaService.updateRutina(updatedRutina).subscribe(
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
      this.diasSemanaRutinaService.deleteDiaSemanaRutina(_id).subscribe(
        (res) => {
          this.getDiasSemanaRutinaByRutinaId();
        },
        (err) => console.log(err)
      );
    }
  }


  newDiaSemanaRutina() {
    // this.nav.navigate(['dieta-dia-nueva']);
    console.log(this.mostrarFormNuevoDiaSemana);

    this.mostrarFormNuevoDiaSemana = !this.mostrarFormNuevoDiaSemana;
  }


  saveNuevoDiaSemanaRutina(form) {
    console.log(form);

      const nuevoDiaSemanaRutina: DiaSemanaRutina = {
        idRutina: this.rutina._id,
        nombre: form['nombre'],
        descripcion: form['descripcion'],
        detalleEjercicios: [],
      };

      if (nuevoDiaSemanaRutina.nombre !== '' && nuevoDiaSemanaRutina.descripcion !== '') {
        console.log(nuevoDiaSemanaRutina);

        this.diasSemanaRutinaService.createDiaSemanaRutina(nuevoDiaSemanaRutina).subscribe(
          (res) => {
            console.log(res);
            this.msgFormDiaSemana = 'Dia de la rutina creado.';
            this.errorFormDiaSemana = '';
            this.getDiasSemanaRutinaByRutinaId();
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
