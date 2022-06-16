import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user, userResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  login(authData : user): Observable<any> {
    return this._http.post<userResponse>(`${environment.API_URL}`,authData)
  }
  logout(): void { }
  private readToken(): void { }
  private saveToken(): void { }
  private handlerError(): void { }
}
