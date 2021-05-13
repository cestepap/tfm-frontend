import { Component, OnInit } from '@angular/core';
import { DietaService } from '../../../../services/dietas.service';
import { Dieta } from '../../../../models/Dieta';
import { StoreService } from '../../../../services/store.service';
import { FormControl } from '@angular/forms';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dieta-nueva',
  templateUrl: './dieta-nueva.component.html',
  styleUrls: ['./dieta-nueva.component.css'],
})
export class DietaNuevaComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private dietaService: DietaService,
    private userService: UserService,
    private router: Router
  ) {}

  public titulo: FormControl;
  public fechaInicio: FormControl;
  public descripcion: FormControl;
  public idUsuario: FormControl;

  public idEntrenadorPersonal: any = this.storeService.getItem(
    'idEntrenadorPersonal'
  );

  newDieta: Dieta = {
    idCliente: '',
    idProfesional: '',
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    estado: '',
    diaSemanaDieta: [],
  };

  diaSemanaDieta: Array<string>;

  users: User[];
  errorForm = '';

  ngOnInit(): void {
    this.getUsersByRole();
  }

  getUsersByRole() {
    this.userService.getUsersByRole('Usuario').subscribe(
      (res) => {
        this.users = res;
        console.log(this.users);
      },
      (err) => console.log(err)
    );
  }

  saveNuevaRutina(form) {
    console.log(form);

    const nuevaDieta: Dieta = {
      idCliente: form['idUsuario'],
      idProfesional: this.idEntrenadorPersonal,
      titulo: form['titulo'],
      descripcion: form['descripcion'],
      fechaInicio: form['fechaInicio'],
      estado: 'Activo',
      diaSemanaDieta: [],
    };

    if (nuevaDieta.titulo !== '' && nuevaDieta.fechaInicio !== '') {
      console.log(nuevaDieta);

      this.dietaService.createDieta(nuevaDieta).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log(err)
      );
      this.router.navigate(['dietas-listado']);

    } else {
      this.errorForm = 'Error en los campos.';
    }
  }
}
