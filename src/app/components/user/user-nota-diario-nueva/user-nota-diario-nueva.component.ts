import { Component, OnInit } from '@angular/core';
import { Diario } from '../../../models/Diario';
import { DiarioService } from '../../../services/diario.service';
import { NotaDiario } from '../../../models/NotaDiario';
import { NotaDiarioService } from '../../../services/notaDiario.service';

import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-nota-diario-nueva',
  templateUrl: './user-nota-diario-nueva.component.html',
  styleUrls: ['./user-nota-diario-nueva.component.css'],
})
export class UserNotaDiarioNuevaComponent implements OnInit {
  constructor(
    public diarioService: DiarioService,
    public notaDiarioService: NotaDiarioService,
    private storeService: StoreService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  public notaDiarioId;
  public diario;
  public fechaNotaDiario;

  public notaDiario: NotaDiario = {
    _id: '',
    idDiario: '',
    fecha: '',
    observaciones: '',
  };

  public msgFormNotaDiario = '';
  public errorFormNotaDiario = '';

  ngOnInit(): void {
    this.notaDiarioId = this.router.snapshot.paramMap.get('notaDiarioId');

    this.fechaNotaDiario = this.router.snapshot.paramMap.get('fecha');

    console.log(this.notaDiarioId);

    this.diario = this.storeService.getItem('diario');
    console.log(this.diario);

    this.getNotaDiario();
  }

  getNotaDiario() {
    this.notaDiarioService.getNotaDiarioById(this.notaDiarioId).subscribe(
      (res) => {
        this.notaDiario = res;
        console.log(this.notaDiario);
      },
      (err) => console.log(err)
    );
  }

  createNotaDiario(form) {
    console.log(form);

    const newNotaDiario: NotaDiario = {
      _id: this.notaDiarioId,
      idDiario: this.diario[0]._id,
      fecha: this.fechaNotaDiario,
      observaciones: form.observaciones,
    };

    console.log(newNotaDiario);

    if (newNotaDiario.observaciones !== '') {
      console.log(newNotaDiario);

      this.notaDiarioService.createNotaDiario(newNotaDiario).subscribe(
        (res) => {
          console.log(res);
          this.route.navigate(['user-diario']);
          this.msgFormNotaDiario = 'Nota del diario creada.';
          this.errorFormNotaDiario = '';
        },
        (err) => console.log(err)
      );
    } else {
      this.errorFormNotaDiario = 'Error en los campos.';
      this.msgFormNotaDiario = '';
    }
  }
}
