import { Component, OnInit } from '@angular/core';
import { RegisztracioService } from '../utils/regisztracio.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent  implements OnInit {

  message: boolean=false; 
  valasz =''

  level = '1';

  user: any = {
    username: null,
    password: null,
    email: null,
    country: null,
    accessLevel: null
  };

  constructor(private regisztracioService: RegisztracioService, private router: ActivatedRoute, private route: Router) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.getUser(params.get('id'));
    }, error => {
    })
    this.getLoggedUser();
  }

  getUser(st: any) {
    this.regisztracioService.getUser(st).subscribe((data: any) => {
      this.user = data;
      this.user.password = null;
    });

  }

vissza() {
    this.route.navigate(['first'])
}

getLoggedUser() {
  this.regisztracioService.getLoggedUser().subscribe((data: any) => {
    this.level = data.accessLevel;
  });
}

szerkesztes() {
  if (this.user.username != null && this.user.password != null && this.user.email != null && this.user.country != null) {
    this.regisztracioService.updateUser(this.user.username, this.user.password, this.user.email, this.user.country).subscribe(
      res =>(''),
      (err: any) => {
        this.valasz = err.error,
        this.message = true;
      },
      () => {
        this.message = true;
        this.valasz = 'Sikeres a módosítás!';
        setTimeout(() => { this.vissza(); }, 3000);
      });
  } else {
    this.valasz = 'Az összes mező kitöltése kötelező!',
    this.message = true;
  }
}

torles() {
  this.regisztracioService.deleteUser(this.user.username).subscribe(
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
