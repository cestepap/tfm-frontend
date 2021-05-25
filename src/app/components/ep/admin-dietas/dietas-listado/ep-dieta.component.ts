import { Component, OnInit } from '@angular/core';
import { DietaService } from '../../../../services/dietas.service';
import { Dieta } from '../../../../models/Dieta';
import { StoreService } from '../../../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ep-dieta',
  templateUrl: './ep-dieta.component.html',
  styleUrls: ['./ep-dieta.component.css']
})
export class EpDietaComponent implements OnInit {

  constructor(    private storeService: StoreService,
    private dietaService: DietaService,
    private router: Router) { }


    dietas: Dieta[];

    public _idEP: any = this.storeService.getItem('idEntrenadorPersonal');

  
    ngOnInit(): void {
      this.getDietasByIdEP();
    }
  
    getDietasByIdEP() {
      console.log(this._idEP);

      this.dietaService.getDietasByIdEP(this._idEP).subscribe(
        (res) => {
          this.dietas = res;
          console.log(this.dietas);
        },
        (err) => console.log(err)
      );
    }
  
    newDieta() {
      this.router.navigate(['dieta-nueva']);
    }
  
    // editRutina() {}
  
    deleteRutina(idDieta) {
      if (confirm('Estás seguro que quieres eliminarlo?')) {
        this.dietaService.deleteDieta(idDieta).subscribe(
          (res) => {
            this.getDietasByIdEP();
          },
          (err) => console.log(err)
        );
      }
    }
}
