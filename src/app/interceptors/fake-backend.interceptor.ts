import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { IUserInfo } from '../interfaces';

// array in local storage for registered users
let user = JSON.parse(localStorage.getItem('user') ?? '{}') || [];
let courses = JSON.parse(localStorage.getItem('courses') ?? '{}') || [];
let userCourses = JSON.parse(localStorage.getItem('userCourses') ?? '{}') || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/register') && method === 'POST':
          return register();
        case url.endsWith('/courses') && method === 'GET':
          return getCourses();
        case url.endsWith('/user-courses') && method === 'GET':
          return getUserCourses();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function register() {
      const user = body
      localStorage.setItem('user', JSON.stringify(user));
      return ok();
    }

    function getCourses() {
      return ok(courses);
    }

    function getUserCourses() {
      if (!isLoggedIn()) return unauthorized();
      return ok(userCourses);
    }
    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message: string) {
      return throwError({ error: { message } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};