import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { User } from '../../../models/User';
import { RutinaService } from '../../../services/rutinas.service';
import { Rutina } from '../../../models/Rutina';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rutina',
  templateUrl: './user-rutina.component.html',
  styleUrls: ['./user-rutina.component.css'],
})
export class UserRutinaComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private rutinaService: RutinaService,
    private router: Router
  ) {}

  rutinas: Rutina[];

  tieneAlgunaRutina: boolean = false;

  public user: any = this.storeService.getItem('user');

  ngOnInit(): void {
    this.getRutinasByIdCliente();
  }

  getRutinasByIdCliente() {
    this.rutinaService.getRutinasByIdCliente(this.user._id).subscribe(
      (res) => {
        this.rutinas = res;
        console.log(this.rutinas);

        if (this.rutinas.length === 0) {
          this.tieneAlgunaRutina = false;
        }
        else this.tieneAlgunaRutina = true; 
      },
      (err) => console.log(err)
    );
  }
}
