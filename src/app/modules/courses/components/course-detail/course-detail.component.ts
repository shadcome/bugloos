import { Component, Input } from '@angular/core';
import { ICourse } from 'src/app/interfaces';
import { ObserveService } from 'src/app/services';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {

  @Input() course: ICourse;

  constructor(private srvObserve: ObserveService) {
    this.course = {
      id: 0,
      discount: 0,
      duration: { hours: 0, minutes: 0 },
      lectureCount: 0,
      masterName: 'No body',
      price: 0,
      rate: 0,
      subject: '',
      title: 'Nothing'
    }
  }

  addToBasket(course: ICourse): void {
    this.srvObserve.addCourse(course)
  }

}
