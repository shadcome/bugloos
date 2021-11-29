import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from 'src/app/interfaces';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  @Input() course: ICourse;

  constructor() {
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

  ngOnInit(): void {
  }

}
