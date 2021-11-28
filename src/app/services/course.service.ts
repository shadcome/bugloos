import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, publishReplay, refCount } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICourse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url: string
  courses: Observable<ICourse[]> | null
  userCourses: Observable<ICourse[]> | null

  constructor(private http: HttpClient) {
    /// global url for all course service
    this.url = `${environment.apiUrl}course/`

    /// first initialize
    this.courses = null
    this.userCourses = null
  }

  /**
   * Get courses from server | HTTP GET
   * @returns 
   */
  getCourses(): Observable<ICourse[]> {
    /// Cache it once if configs value is false
    if (!this.courses) {
      this.courses = this.http.get<ICourse[]>(`${this.url}courses`).pipe(
        map(data => data),
        publishReplay(1), /// this tells Rx to cache the latest emitted
        refCount() /// and this tells Rx to keep the Observable alive as long as there are any Subscribers
      );
    }
    return this.courses;
  }

  /**
 * Get user courses from server | HTTP GET
 * @returns 
 */
  getUserCourses(): Observable<ICourse[]> {
    /// Cache it once if configs value is false
    if (!this.userCourses) {
      this.userCourses = this.http.get<ICourse[]>(`${this.url}/user-courses`).pipe(
        map(data => data),
        publishReplay(1), /// this tells Rx to cache the latest emitted
        refCount() /// and this tells Rx to keep the Observable alive as long as there are any Subscribers
      );
    }
    return this.userCourses;
  }

  /**
   * Clear courses
   */
  clearUserCourses() {
    this.userCourses = null;
  }

  /**
   * Clear courses
   */
  clearCourses() {
    this.courses = null;
  }

}
