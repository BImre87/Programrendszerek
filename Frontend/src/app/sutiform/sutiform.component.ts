import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SutiService } from '../utils/suti.service';

@Component({
  selector: 'app-sutiform',
  templateUrl: './sutiform.component.html',
  styleUrls: ['./sutiform.component.css']
})
export class SutiformComponent {

  form: any = {
    megnevezes: null,
    suly: null,
    cukortartalom: null,
    ar: null
  };

  sutiList: any;

  message: boolean=false; 
  valasz =''

  constructor(private router: Router, private sutiService: SutiService) {
  }

  ngOnInit(): void {
  }

  vissza() {
    this.router.navigate(['first'])
  }

  addSuti() {
    if (this.form.megnevezes != null && this.form.suly != null && this.form.cukortartalom != null && this.form.ar != null) {
      this.sutiService.createSuti(this.form.megnevezes, this.form.suly, this.form.cukortartalom, this.form.ar).subscribe(
        res =>(''),
        (err: any) => {
          this.valasz = err.error,
          this.message = true;
        },
        () => {
          this.valasz = 'Sikeres felvétel',
          this.message = true;
          this.form = [];
        });
    } else {
      this.valasz = 'Az összes mező kitöltése kötelező!',
      this.message = true;
    }
  }

}
