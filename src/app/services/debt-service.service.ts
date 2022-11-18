import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { global } from './global';
import { Observable, Subject, tap } from 'rxjs';
import { GetDebts } from '../models/debts.interface';

@Injectable({
  providedIn: 'root',
})
export class DebtServiceService {
  public url = global.url;

  private _refresh$ = new Subject<void>();

  constructor(private _http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getDebts(token: string): Observable<any> {
    let header = new HttpHeaders().set('auth', token);
    return this._http.get(this.url + 'getdebts', { headers: header });
  }

  getDebt(iddebt: any, token: string): Observable<any> {
    let header = new HttpHeaders().set('auth', token);
    return this._http.get(this.url + 'getDebt/' + iddebt, { headers: header });
  }

  setDebt(dataDebt: any): Observable<any> {
    return this._http
      .post(this.url + 'setDebt', dataDebt, { observe: 'response' })
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  editDebt(iddebt: any, debt: any, token: string): Observable<any> {
    let header = new HttpHeaders().set('auth', token);
    return this._http
      .put(this.url + 'editDebt/' + iddebt, debt, {
        headers: header,
        observe: 'response',
      })
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  deleteDebt(iddebt: any,token:string): Observable<any> {
    let header = new HttpHeaders().set('auth', token);
    return this._http.delete(this.url + 'deleteDebt/'+iddebt,{headers:header});
  }

  getTotalDebts(): Observable<any> {
    return this._http.get(this.url + 'getTotalDebts');
  }

  getCustomers(): Observable<any> {
    return this._http.get(`${this.url}getCustomers`);
  }
}
