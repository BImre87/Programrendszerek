import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisztracioService } from '../utils/regisztracio.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css']
})
export class RegisztracioComponent implements OnInit {

  message: boolean=false; 
  valasz =''

  constructor(private router: Router, private regisztracioService: RegisztracioService) {
  }

  form: any = {
    username: null,
    password: null,
    email: null,
    country: null
  };


  ngOnInit(): void {
  }

  registration() {
    if (this.form.username != null && this.form.password != null && this.form.email != null && this.form.country != null) {
      this.regisztracioService.createUser(this.form.username, this.form.password, this.form.email, this.form.country).subscribe(
        res =>(''),
        (err: any) => {
          this.valasz = err.error,
          this.message = true;
        },
        () => {
          this.valasz = 'Sikeres regisztráció',
          this.message = true;
          this.form = [];
        });
    } else {
      this.valasz = 'Az összes mező kitöltése kötelező!',
      this.message = true;
    }
  }

  login() {
    this.router.navigate([''])
  }
}
