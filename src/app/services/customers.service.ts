import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  public url= global.url;
  private _refresh$ = new Subject<void>();

  constructor(
    private _http: HttpClient
  ) {

  }

  get refresh$() {
    return this._refresh$;
  }

  getCustomers(): Observable<any> {
    return this._http.get(`${this.url}getCustomers`);
  }

  getCustomer(idCustomer:any): Observable<any> {
    return this._http.get(`${this.url}getCustomer/${idCustomer}`);
  }

  setCustomer(dataCustomer:any,token:string): Observable<any>{
    let header = new HttpHeaders().set('auth', token);
    return this._http.post(this.url+'setCustomer',dataCustomer,{headers:header,observe:'response'})
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  editCustomer(idCustomer:Number,params:any,token:string): Observable<any>{
    let header = new HttpHeaders().set('auth', token);
    return this._http.put(`${this.url}editCustomer/${idCustomer}`,params, {headers:header,observe:'response'})
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }

  deleteCustomer(idCustomer:Number,token:string):Observable <any>{
    let header = new HttpHeaders().set('auth', token);
    return this._http.delete(`${this.url}deleteCustomer/${idCustomer}`,{headers:header,observe:'response'})
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

}
