import { Component, OnInit } from '@angular/core';
import { AlimentosService } from '../../../services/alimentos.service';
import { Alimento } from '../../../models/Alimento';
import { NgForm } from '@angular/forms';
import { StoreService } from '../../../services/store.service';


@Component({
  selector: 'app-admin-alimentos',
  templateUrl: './admin-alimentos.component.html',
  styleUrls: ['./admin-alimentos.component.css']
})
export class AdminAlimentosComponent implements OnInit {

  alimentos: Alimento[];

  selectedAlimento: Alimento = {
    nombre: '',
    descripcion: '',
    grupoAlimento: '',
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0,
    kcal: 0,
    imagen:'assets/img/alimentos/food-icon.png'
  };
  
  public errorForm = '';
  public msgForm = '';

  // public user: User = this.storeService.getItem('user');
  // public token: any = this.storeService.getItem('token');

  public user: any = this.storeService.getUser();
  public token: any = this.storeService.getToken();

  fileToUpload: File = null;
 
  constructor(
    private alimentoService: AlimentosService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {

    this.getAlimentos();

    if (this.token) {
      console.log('permission granted. token saved');
    }
    else {
      console.log('no token saved');
    }

  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getAlimentos() {
    this.alimentoService.getAlimentos().subscribe(
      (res) => {
        this.alimentos = res;
        console.log(this.alimentos);
      },
      (err) => console.log(err)
    );
  }

  addAlimento(form: NgForm) {
    if (form.value._id) {
      this.alimentoService.putAlimento(form.value).subscribe(
        (res) => {
          console.log(res);
          this.msgForm = 'Actualizado.';
          this.errorForm = '';
          this.getAlimentos();
        },
        (err) => console.log(err)
      );
    } else {
      this.alimentoService.createAlimento(form.value).subscribe(
        (res) => {
          this.getAlimentos();
          form.reset();
        },
        (err) => console.log(err)
      );
    }
  }

  deleteAlimento(id: string) {
    if (confirm('Are you sure to you want to delete it?')) {
      this.alimentoService.deleteAlimento(id).subscribe(
        (res) => {
          console.log(id);
          this.getAlimentos();
        },
        (err) => console.log(err)
      );
    }
  }

  editAlimento(alimento: Alimento) {
    this.selectedAlimento = alimento;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
}

// uploadFileToActivity() {
//   this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
//     // do something, if upload success
//     }, error => {
//       console.log(error);
//     });
// }
  
}
