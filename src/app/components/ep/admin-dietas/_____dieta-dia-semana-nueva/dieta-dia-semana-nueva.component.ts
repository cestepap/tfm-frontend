import { Component, OnInit } from '@angular/core';
import { DiaSemanaDietaService } from '../../../../services/diaSemanaDieta.service';
import { DiaSemanaDieta } from '../../../../models/DiaSemanaDieta';
import { StoreService } from '../../../../services/store.service';
import { FormControl } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dieta-dia-semana-nueva',
  templateUrl: './dieta-dia-semana-nueva.component.html',
  styleUrls: ['./dieta-dia-semana-nueva.component.css'],
})
export class DietaDiaSemanaNuevaComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private diaSemanaDietaService: DiaSemanaDietaService,
    private router: Router
  ) {}

  public nombre: FormControl;
  public fechaInicio: FormControl;
  public descripcion: FormControl;
  public idUsuario: FormControl;

  public dieta: any = this.storeService.getItem('dieta');

  nuevoDiaSemanaDieta: DiaSemanaDieta = {
    idDieta: '',
    nombre: '',
    descripcion: '',
    comida: [],
  };

  errorForm = '';
  msgForm = '';

  ngOnInit(): void {}

  saveNuevoDiaSemanaDieta(form) {
    console.log(form);

      const nuevoDiaSemanaDieta: DiaSemanaDieta = {
        idDieta: this.dieta._id,
        nombre: form['nombre'],
        descripcion: form['descripcion'],
        comida: [],
      };

      if (nuevoDiaSemanaDieta.nombre !== '' && nuevoDiaSemanaDieta.descripcion !== '') {
        console.log(nuevoDiaSemanaDieta);

        this.diaSemanaDietaService.createDiaSemanaDieta(nuevoDiaSemanaDieta).subscribe(
          (res) => {
            console.log(res);
            this.msgForm = 'Dia de la dieta creado.';
            this.errorForm = '';
          },
          (err) => console.log(err)
        );

      } else {
        this.errorForm = 'Error en los campos.';
        this.msgForm = '';

      }
  }
}
