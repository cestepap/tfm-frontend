import { Component, OnInit } from '@angular/core';
import { DietaService } from '../../../services/dietas.service';
import { Dieta } from '../../../models/Dieta';
import { Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-dieta',
  templateUrl: './user-dieta.component.html',
  styleUrls: ['./user-dieta.component.css'],
})
export class UserDietaComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private dietaService: DietaService,
    private router: Router
  ) {}

  dietas: Dieta[];

  tieneAlgunaDieta: boolean = false;

  public user: any = this.storeService.getItem('user');

  ngOnInit(): void {
    this.getDietasByIdCliente();
  }

  getDietasByIdCliente() {
    console.log(this.tieneAlgunaDieta);

    this.dietaService.getDietasByIdCliente(this.user._id).subscribe(
      (res) => {
        this.dietas = res;
        console.log(this.dietas);

        if (this.dietas.length === 0) {
          this.tieneAlgunaDieta = false;
        }
        else this.tieneAlgunaDieta = true; 
      },
      (err) => console.log(err)
    );
  }
}
