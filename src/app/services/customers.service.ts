import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  public url: String;

  constructor(
    private _http: HttpClient
  ) {
    this.url= global.url;
  }

  getCustomers(): Observable<any> {
    return this._http.get(`${this.url}getCustomers`);
  }

  getCustomer(idCustomer:any): Observable<any> {
    return this._http.get(`${this.url}getCustomer/${idCustomer}`);
  }

  editCustomer(idCustomer:Number,formEditCustomer:any){

  }

}
