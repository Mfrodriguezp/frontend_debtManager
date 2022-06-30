import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User, UserResponse } from '../models/user.interface';
import { global } from './global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url = global.url;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  login(user: User): Observable<UserResponse | void> {
    return this._http.post<UserResponse>(this.url + "login", user)
      .pipe(
        map((res: UserResponse) => {
          this.saveToken(res.token);
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout(): Observable<any> {
    return this._http.get(this.url + "logout");
  }


  //Verified Authenticated
  isAuth(token:any): Observable<any> {
    let header = new HttpHeaders().set('token',token);
    return this._http.get(this.url + "isAuth",{headers:header});
  }

  private readToken(): void {
    localStorage.getItem('token');
  }
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An Error ocurred retrienving data';
    if (err) {
      errorMessage = `Error: code  ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
