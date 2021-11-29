import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ICourse } from '../interfaces';

// array in local storage for courses
let userCourses = JSON.parse(localStorage.getItem('userCourses') ?? '{}') || [];
const courses: ICourse[] = [{
  "id": 1,
  "title": "Data Science and Machine Learning with Python - Hands On!",
  "duration": {
    "hours": 8,
    "minutes": 18
  },
  "rate": 4.5,
  "lectureCount": 29,
  "subject": "Science",
  "masterName": "Jason Williams",
  "price": 440.00,
  "discount": 55.00
},
{
  "id": 2,
  "title": "Create Amazing Color Schemes for Your UX Design Projects",
  "duration": {
    "hours": 8,
    "minutes": 18
  },
  "rate": 3.8,
  "lectureCount": 29,
  "subject": "Science",
  "masterName": "Pamela Foster",
  "price": 420.00,
  "discount": 0
},
{
  "id": 3,
  "title": "Culture & Leadership: Strategies for a Successful Business",
  "duration": {
    "hours": 8,
    "minutes": 18
  },
  "rate": 4.9,
  "lectureCount": 29,
  "subject": "Science",
  "masterName": "Rose Simmons",
  "price": 340.00,
  "discount": 45.00
},
{
  "id": 4,
  "title": "Finance Series: Learn to Budget and Calculate your Net Worth.",
  "duration": {
    "hours": 8,
    "minutes": 18
  },
  "rate": 4.9,
  "lectureCount": 29,
  "subject": "Science",
  "masterName": "Jason Williams",
  "price": 0,
  "discount": 0
},
{
  "id": 5,
  "title": "Build Brand Into Marketing: Tackling the New Marketing Landscape",
  "duration": {
    "hours": 8,
    "minutes": 18
  },
  "rate": 4,
  "lectureCount": 29,
  "subject": "Science",
  "masterName": "Jason Williams",
  "price": 136,
  "discount": 0
},
{
  "id": 6,
  "title": "Graphic Design: Illustrating Badges and Icons with Geometric Shapes",
  "duration": {
    "hours": 8,
    "minutes": 18
  },
  "rate": 3.9,
  "lectureCount": 29,
  "subject": "Science",
  "masterName": "Jason Williams",
  "price": 237,
  "discount": 0
}
]

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('auth/register') && method === 'POST':
          return register();
        case url.endsWith('course/courses') && method === 'GET':
          return getCourses();
        case url.endsWith('course/user-courses') && method === 'GET':
          return getUserCourses();
        case url.endsWith('course/add-user-courses') && method === 'POST':
          return addUserCourses();
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

    function addUserCourses() {
      if (!isLoggedIn()) return unauthorized();
      const newCourses = body

      /// Merge new and old courses
      const tempCourses = []
      for (let i = 0; i < userCourses.length; i++) {
        if (tempCourses.indexOf(userCourses[i]) == -1)
          tempCourses.push(userCourses[i])
      }
      for (let i = 0; i < newCourses.length; i++) {
        if (tempCourses.indexOf(newCourses[i]) == -1)
          tempCourses.push(newCourses[i])
      }
      userCourses = tempCourses
      localStorage.setItem('userCourses', JSON.stringify(tempCourses));
      return ok(true);
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