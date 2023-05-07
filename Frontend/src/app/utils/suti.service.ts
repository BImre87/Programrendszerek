import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SutiService {

  constructor(private http: HttpClient) { }

  createSuti(megnevezes: string, suly: number, cukortartalom: number, ar: number) {
    return this.http.post(enviroment.serverUrl + 'sutik/', {megnevezes: megnevezes, suly: suly, cukortartalom: cukortartalom, ar: ar}, {responseType: 'text'});
  }

  getSuti(id: string) {
    return this.http.get(enviroment.serverUrl + 'sutik/'+  id );
  }

  getSutiList() {
    return this.http.get(enviroment.serverUrl + 'sutik/');
  }

  deleteSuti(id: string) {
    return this.http.delete(enviroment.serverUrl + 'sutik/' +  id);
  }

  updateSuti(megnevezes: string, suly: number, cukortartalom: number, ar: number) {
    return this.http.patch(enviroment.serverUrl + 'sutik/' + megnevezes, {megnevezes: megnevezes, suly: suly, cukortartalom: cukortartalom, ar: ar},{responseType: 'text'});
  }
}
