import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  /**
   * If user is logged, set token on header 
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = localStorage.getItem('user')
    if (!!user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer fake-jwt-token`
        }
      });
    }
    return next.handle(request);
  }
}
