import { Component, OnInit } from '@angular/core';
import { DiaSemanaRutinaService } from '../../../../services/diasSemanaRutina.service';
import { DiaSemanaRutina } from '../../../../models/DiaSemanaRutina';
import { StoreService } from '../../../../services/store.service';
import { FormControl } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rutina-dia-semana-rutina-nueva',
  templateUrl: './rutina-dia-semana-rutina-nueva.component.html',
  styleUrls: ['./rutina-dia-semana-rutina-nueva.component.css'],
})
export class RutinaDiaSemanaRutinaNuevaComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private diaSemanaRutinaService: DiaSemanaRutinaService,
    private router: Router
  ) {}

  public titulo: FormControl;
  public fechaInicio: FormControl;
  public descripcion: FormControl;
  public idUsuario: FormControl;

  public rutina: any = this.storeService.getItem('rutina');

  nuevoDiaSemanaRutina: DiaSemanaRutina = {
    idRutina: '',
    nombre: '',
    descripcion: '',
    detalleEjercicios: [],
  };

  errorForm = '';
  msgForm = '';

  ngOnInit(): void {}

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

        this.diaSemanaRutinaService.createDiaSemanaRutina(nuevoDiaSemanaRutina).subscribe(
          (res) => {
            console.log(res);
            this.msgForm = 'Dia de entrenamiento creado.';
            this.errorForm = '';
          },
          (err) => console.log(err)
        );
        // this.router.navigate(['rutina/{{this.rutina._id}}']);

      } else {
        this.errorForm = 'Error en los campos.';
        this.msgForm = '';

      }
  }
}
