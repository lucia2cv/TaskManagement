import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


export interface User{
  id?:number;
  nombre:string;
  rol:string;
  authdata: string;
  email:string;


}
@Injectable()
export class LoginService {

  isLogged = false;
  user: User;
  auth: string;

  constructor(private http: HttpClient) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      console.log('Logged user');
      this.setCurrentUser(user);
    }
  }

  private setCurrentUser(user: User) {
    this.isLogged = true;
    this.user = user;
  }

  removeCurrentUser(){
    localStorage.removeItem('currentUser');
    this.isLogged = false;
  }

  login(nombre: string, password:string){

    let auth = window.btoa(nombre + ':' + password); //encripta
    console.log( "nombre: "+ nombre +" " + "password: " + password + " servicio login");
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + auth, 'X-Requested-With': 'XMLHttpRequest',
    });


    console.log("buscando ruta");
    return this.http.get<User>('http://localhost:8080/', { headers })
      .pipe(map(user => {

        if (user) {
          this.setCurrentUser(user);
          user.authdata = auth;
          localStorage.setItem('currentUser', JSON.stringify(user));

        }
        return user;
      }));
    console.log("hola estoy aqui")
  }

  logout(){
    return this.http.get(URL + '/logout').pipe(
      map(response => {
        this.removeCurrentUser();
        return response;
      }),
    );
  }
}
