import { Component, OnInit } from '@angular/core';
import { CalendarCreator } from '../../../services/calendarCreator.service';
import { Day } from '../../../models/Day';
import { Diario } from '../../../models/Diario';
import { DiarioService } from '../../../services/diario.service';
import { NotaDiario } from '../../../models/NotaDiario';
import { NotaDiarioService } from '../../../services/notaDiario.service';

import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-diario',
  providers: [CalendarCreator],
  templateUrl: './user-diario.component.html',
  styleUrls: ['./user-diario.component.css'],
})
export class UserDiarioComponent implements OnInit {
  public monthDays: Day[];

  public monthNumber: number;
  public year: number;

  public weekDaysName = [];

  public newDescripcion: FormControl;
  public descripcion: FormControl;

  public user: any = this.storeService.getItem('user');

  public diario: Diario;

  public newDiario: Diario = {
    idCliente: '',
    descripcion: '',
    notasDiario: [''],
  };

  public notasDiario: NotaDiario[];

  errorForm = '';
  msgForm = '';
  errorFormDiario = '';
  msgFormDiario = '';

  mostrarFormDiario = true;
  mostrarDiario = false;

  constructor(
    public calendarCreator: CalendarCreator,
    public diarioService: DiarioService,
    public notaDiarioService: NotaDiarioService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setMonthDays(this.calendarCreator.getCurrentMonth());

    this.weekDaysName.push('L');
    this.weekDaysName.push('M');
    this.weekDaysName.push('X');
    this.weekDaysName.push('J');
    this.weekDaysName.push('V');
    this.weekDaysName.push('S');
    this.weekDaysName.push('D');

    console.log(this.user);
    this.getDiario();
  }

  getDiario() {
    this.diarioService.getDiarioByUserId(this.user._id).subscribe(
      (res) => {
        // this.diario[0]._id == 'null';

        this.diario = res;
        console.log(this.diario);
        this.storeService.addItem('diario', this.diario);

        if (this.diario != null) {
          if (this.diario[0]._id != undefined) {
            this.mostrarFormDiario = false;
            this.mostrarDiario = true;
            this.getNotasDiario(this.diario[0]._id);
          }
        }
      },
      (err) => console.log(err)
    );
  }

  getNotasDiario(diarioId) {
    // this.miDiario = this.storeService.getItem('diario');

    this.notaDiarioService.getNotasDiarioByDiarioId(diarioId).subscribe(
      (res) => {
        this.notasDiario = res;
        console.log(this.notasDiario);
      },
      (err) => console.log(err)
    );
  }

  updateDiario(form) {
    console.log(form);

    const updateDiario: Diario = {
      _id: this.diario[0]._id,
      idCliente: this.user._id,
      descripcion: form.descripcion,
      notasDiario: [],
    };

    console.log(updateDiario);

    if (updateDiario.descripcion !== '') {
      console.log(updateDiario);

      this.diarioService.updateDiario(updateDiario).subscribe(
        (res) => {
          console.log(res);
          this.msgFormDiario = 'Actualizado.';
          this.errorFormDiario = '';
        },
        (err) => console.log(err)
      );
    } else {
      this.errorFormDiario = 'Error en los campos.';
      this.msgFormDiario = '';
    }
  }

  saveNewDiario(form) {
    console.log(form);

    const nuevoDiario: Diario = {
      idCliente: this.user._id,
      descripcion: form['descripcion'],
      notasDiario: [],
    };

    console.log(nuevoDiario);

    if (nuevoDiario.descripcion !== '') {
      console.log(nuevoDiario);

      this.diarioService.createDiario(nuevoDiario).subscribe(
        (res) => {
          console.log(res);
          this.msgForm = 'Diario creado.';
          this.errorForm = '';
          this.getDiario();        },
        (err) => console.log(err)
      );
    } else {
      this.errorForm = 'Error en los campos.';
      this.msgForm = '';
    }

  }

  deleteNota(nota) {
    if (confirm('Estas seguro que quieres eliminar esta Nota de tu Diario?')) {
      this.notaDiarioService.deleteNotaDiario(nota._id).subscribe(
        (res) => {
          this.getNotasDiario(this.diario[0]._id);
        },
        (err) => console.log(err)
      );
    }
  }

  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber == 13) {
      this.monthNumber = 1;
      this.year++;
    }

    this.setMonthDays(
      this.calendarCreator.getMonth(this.monthNumber, this.year)
    );
  }

  onPreviousMonth(): void {
    this.monthNumber--;

    if (this.monthNumber < 1) {
      this.monthNumber = 12;
      this.year--;
    }

    this.setMonthDays(
      this.calendarCreator.getMonth(this.monthNumber, this.year)
    );
  }

  private setMonthDays(days: Day[]): void {
    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }

  notaDiario(day) {
    const fecha = `${day.number}-${day.monthIndex + 1}-${day.year}`;

    // if (confirm('Estas seguro que quieres añadir una nueva Nota al Diario para el día: ' + fecha + '?')) {
    console.log(day);
    const urlFecha = 'user-nota-diario-nueva/' + fecha;
    console.log(urlFecha);
    this.router.navigate([urlFecha]);
  }
  // }
}
