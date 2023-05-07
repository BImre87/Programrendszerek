import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(enviroment.serverUrl + 'users/login', {username: username, password: password}, {responseType: 'text'});
  }

  logout() {
    return this.http.post(enviroment.serverUrl + 'users/logout', {}, {withCredentials: true, responseType: 'text'});
  }

}
