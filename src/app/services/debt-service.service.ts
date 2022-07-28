import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable, Subject, tap } from 'rxjs';
import { GetDebts } from '../models/debts.interface';

@Injectable({
  providedIn: 'root'
})
export class DebtServiceService {
  public url = global.url;

  private _refresh$ = new Subject<void>();

  constructor(
    private _http: HttpClient
  ) { }

  get refresh$(){
    return this._refresh$;
  }

  getDebts(token:string):Observable<any>{
    let header = new HttpHeaders().set('auth', token);
    return this._http.get(this.url+"getdebts",{headers:header});
  }

  getDebt(iddebt:any,token:string):Observable<any>{
    let header = new HttpHeaders().set('auth',token); 
    return this._http.get(this.url+"getDebt/"+iddebt,{headers:header});
  }

  editDebt(iddebt:any,debt:any,token:string):Observable<any>{
    let header = new HttpHeaders().set('auth',token);
    return this._http.put(this.url+"editDebt/"+iddebt,debt,{headers:header,observe:'response'})
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }

  getTotalDebts():Observable<any>{
    return this._http.get(this.url+"getTotalDebts");
  }

}
