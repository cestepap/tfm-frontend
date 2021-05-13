import { Component, OnInit } from '@angular/core';
import { RutinaService } from '../../../../services/rutinas.service';
import { Rutina } from '../../../../models/Rutina';
import { StoreService } from '../../../../services/store.service';
import { FormControl } from '@angular/forms';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rutina-nueva',
  templateUrl: './rutina-nueva.component.html',
  styleUrls: ['./rutina-nueva.component.css'],
})
export class RutinaNuevaComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private rutinaService: RutinaService,
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

  newRutina: Rutina = {
    idCliente: '',
    idProfesional: '',
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    estado: '',
    diasSemanaRutina: [],
  };

  users: User[];
  rutina: Rutina;
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

    const nuevaRutina: Rutina = {
      idCliente: form['idUsuario'],
      idProfesional: this.idEntrenadorPersonal,
      titulo: form['titulo'],
      descripcion: form['descripcion'],
      fechaInicio: form['fechaInicio'],
      estado: 'Activo',
      diasSemanaRutina: [],
    };

    if (nuevaRutina.titulo !== '' && nuevaRutina.fechaInicio !== '') {
      console.log(nuevaRutina);

      this.rutinaService.createRutina(nuevaRutina).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log(err)
      );
      this.router.navigate(['rutinas-listado']);
      // this.router.navigate(['`rutina${}`]);

    } else {
      this.errorForm = 'Error en los campos.';
    }
  }
}
