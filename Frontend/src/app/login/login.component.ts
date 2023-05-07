import { Component, OnInit } from '@angular/core';
import { LoginService } from '../utils/login.service';
import { Router } from '@angular/router';
import { RegisztracioService } from '../utils/regisztracio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private loginService: LoginService, private regisztracioService: RegisztracioService, private router: Router) {
    this.username = '';
    this.password = '';
  }

  login() {
    if (this.username != '' && this.password != '') {
      this.loginService.login(this.username, this.password).subscribe((msg: any) => {
        localStorage.setItem('user', this.username);
        this.router.navigate(['/first']);
      }, (error: any) => {
        console.log(error);
      })
    }
  }

  regisztracio() {
    this.router.navigate(['/regisztracio/'])
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loginService.logout().subscribe((msg: any) => {
        localStorage.setItem('user', this.username);
      }, (error: any) => {
        console.log(error);
      })
    }
  }
}
