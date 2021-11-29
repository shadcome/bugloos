import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICourse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
/**
 * This service is used to implement the observer pattern
 */
export class ObserveService {

  private basket = new BehaviorSubject<ICourse[]>([])
  basket$ = this.basket.asObservable()

  addCourse(course: ICourse): void {
    const temp = this.basket.getValue()
    if (!temp.find(t => t.id == course.id)) {
      temp.push(course)
      this.basket.next(temp)
    }
  }

}
