import { Component, OnInit } from '@angular/core';
import { RegisztracioService } from '../utils/regisztracio.service';
import { ActivatedRoute } from '@angular/router';
import { Suti } from '../models/suti.model';
import { Router } from '@angular/router';
import { SutiService } from '../utils/suti.service';

@Component({
  selector: 'app-sutidetails',
  templateUrl: './sutidetails.component.html',
  styleUrls: ['./sutidetails.component.css']
})
export class SutidetailsComponent {
  message: boolean=false; 
  valasz =''

  level = '1';

  suti: any = {
    megnevezes: null,
    suly: null,
    cukortartalom: null,
    ar: null
  };

  constructor(private regisztracioService: RegisztracioService, private sutiService: SutiService, private router: ActivatedRoute, private route: Router) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.getSuti(params.get('id'));
    }, error => {
    })
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.regisztracioService.getLoggedUser().subscribe((data: any) => {
      this.level = data.accessLevel;
    });
  }

  getSuti(st: any) {
    this.sutiService.getSuti(st).subscribe((data: any) => {
      this.suti = data;
    });

  }

  vissza() {
      this.route.navigate(['first'])
  }

  szerkesztes() {
    if (this.suti.megnevezes != null && this.suti.suly != null && this.suti.cukortartalom != null && this.suti.ar != null) {
      this.sutiService.updateSuti(this.suti.megnevezes, this.suti.suly, this.suti.cukortartalom, this.suti.ar).subscribe(
        res =>(''),
        (err: any) => {
          this.valasz = err.error,
          this.message = true;
        },
        () => {
          this.message = true;
          this.valasz = 'Sikeres a módosítás!';
        });
    }
  }

  torles() {
    this.sutiService.deleteSuti(this.suti.megnevezes).subscribe(
      res =>(''),
      (err: any) => {
        this.valasz = err.error,
        this.message = true;
      },
      () => {
        this.message = true;
        this.valasz = 'Sikeres törlés!';
        this.level = '1';
        setTimeout(() => { this.vissza(); }, 3000);
      });
}
}
