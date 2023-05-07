import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RegisztracioService {

  constructor(private http: HttpClient) { }

  createUser(username: string, password: string, email: string, country: string) {
    return this.http.post(enviroment.serverUrl + 'users/', {username: username, password: password, email: email, country: country}, {responseType: 'text'});
  }

  getUser(id: string) {
    return this.http.get(enviroment.serverUrl + 'users/'+  id );
  }

  getLoggedUser() {
    return this.http.get(enviroment.serverUrl + 'users/status' );
  }
  
  getUserList() {
    return this.http.get(enviroment.serverUrl + 'users/');
  }

  deleteUser(id: string) {
    return this.http.delete(enviroment.serverUrl + 'users/' +  id);
  }

  updateUser(username: string, password: string, email: string, country: string) {
    return this.http.patch(enviroment.serverUrl + 'users/' + username, {username: username, password: password, email: email, country: country},{responseType: 'text'});
  }

}
