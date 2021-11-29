import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route: Router,private _snackBar: MatSnackBar) {}


  /**
   * All server errors are handled here.
   * @param req 
   * @param next 
   * @returns 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case 401:
            this.route.navigate(['auth'])
            break
          case 403:
            break
          case 500:
            break
        }
        this._snackBar.open(error.message, 'Ok', { duration: 2000 })
        return throwError(error.message);
      })
    )
  }
}
