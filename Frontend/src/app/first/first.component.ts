import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisztracioService } from '../utils/regisztracio.service';
import { User } from '../models/user.model';
import { Suti } from '../models/suti.model';
import { SutiService } from '../utils/suti.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  elist?: User[];
  sList?: Suti[];

  constructor(private connectionService: ConnectionService, private regisztracioService: RegisztracioService, private sutiService: SutiService, private router: Router) {
     this.list();
     this.sutiList();
  }
  ngOnInit(): void {
  }

  list() {
    this.regisztracioService.getUserList().subscribe((data: any) => {
      this.elist = data;
    });
  }

  sutiList() {
    this.sutiService.getSutiList().subscribe((data: any) => {
      this.sList = data;
    });
  }

  reszletek(st: string) {
    this.router.navigate(['/userdata/', st])
  }

  sutiFelvetel() {
    this.router.navigate(['/createsuti'])
  }

  sutiadatok(st: string) {
    this.router.navigate(['/sutidata/', st])
  }

}
