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
  selector: 'app-user-nota-diario',
  templateUrl: './user-nota-diario.component.html',
  styleUrls: ['./user-nota-diario.component.css'],
})
export class UserNotaDiarioComponent implements OnInit {
  constructor(
    public diarioService: DiarioService,
    public notaDiarioService: NotaDiarioService,
    private storeService: StoreService,
    private router: ActivatedRoute
  ) {}

  public notaDiarioId;
  public diario;
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

  updateNotaDiario(form) {
    console.log(form);

    const updatedNotaDiario: NotaDiario = {
      _id: this.notaDiarioId,
      idDiario: this.diario[0]._id,
      fecha: form.fecha,
      observaciones: form.observaciones,
    };

    console.log(updatedNotaDiario);

    if (
      updatedNotaDiario.fecha !== '' ||
      updatedNotaDiario.observaciones !== ''
    ) {
      console.log(updatedNotaDiario);

      this.notaDiarioService.updateNotaDiario(updatedNotaDiario).subscribe(
        (res) => {
          console.log(res);
          this.msgFormNotaDiario = 'Actualizado.';
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
