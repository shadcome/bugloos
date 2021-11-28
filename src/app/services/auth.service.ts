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

  constructor(private http: HttpClient) {
    /// global url for all auth service
    this.url = `${environment.apiUrl}auth/`
  }

  register(user: IUserInfo): Observable<any> {
    return this.http.post<any>(`${this.url}register`, user)
  }

}
