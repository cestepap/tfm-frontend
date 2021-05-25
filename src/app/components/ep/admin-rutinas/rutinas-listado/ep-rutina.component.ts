import { Component, OnInit } from '@angular/core';
import { RutinaService } from '../../../../services/rutinas.service';
import { Rutina } from '../../../../models/Rutina';
import { StoreService } from '../../../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ep-rutina',
  templateUrl: './ep-rutina.component.html',
  styleUrls: ['./ep-rutina.component.css'],
})
export class EpRutinaComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private rutinaService: RutinaService,
    private router: Router
  ) {}

  // rutinas = [
  //   {
  //     fechaAlta: '12/03/2021',
  //     usuarioCliente: 'Carlos',
  //     estado: 'Activo',
  //   },
  //   {
  //     fechaAlta: '15/03/2021',
  //     usuarioCliente: 'Sergio',
  //     estado: 'Activo',
  //   },
  //   { fechaAlta: '18/03/2021', usuarioCliente: 'Maria', estado: 'Activo' },
  // ];

  rutinas: Rutina[];

  public _idEP: any = this.storeService.getItem('idEntrenadorPersonal');

  ngOnInit(): void {
    this.getRutinasByIdEP();
  }

  getRutinasByIdEP() {
    this.rutinaService.getRutinasByIdEP(this._idEP).subscribe(
      (res) => {
        this.rutinas = res;
        console.log(this.rutinas);
      },
      (err) => console.log(err)
    );
  }

  newRutina() {
    this.router.navigate(['rutina-nueva']);
  }

  editRutina() {}

  deleteRutina(idRutina) {
    if (confirm('Estás seguro que quieres eliminarlo?')) {
      this.rutinaService.deleteRutina(idRutina).subscribe(
        (res) => {
          this.getRutinasByIdEP();
        },
        (err) => console.log(err)
      );
    }
  }
}
