import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserInfo } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string
  http: HttpClient

  constructor(private bHttp: HttpBackend) {
    /// global url for all auth service
    this.url = `${environment.apiUrl}auth/`

    /// We use httpBackend to prevent the header from filling the interceptor.
    this.http = new HttpClient(bHttp)
  }

  register(user: IUserInfo): Observable<any> {
    return this.http.post<any>(`${this.url}register`, user)
  }

}
