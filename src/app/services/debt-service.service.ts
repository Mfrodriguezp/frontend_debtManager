import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebtServiceService {
  public url = global.url;

  constructor(
    private _http: HttpClient
  ) { }

  getDebts(token:string):Observable<any>{
    let header = new HttpHeaders().set('auth', token);
    return this._http.get(this.url+"getdebts",{headers:header});
  }

}
