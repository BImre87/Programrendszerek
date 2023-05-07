import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) {

  }

  greet() {
    return this.http.get(enviroment.serverUrl + 'users/', {responseType: 'text', withCredentials: true})
  }
}
