import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/interfaces';
import { CourseService } from 'src/app/services';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses: ICourse[] = [];

  constructor(private srvCourse: CourseService) { }

  ngOnInit(): void {
    this.srvCourse.getCourses().subscribe(res => {
      this.courses = res;
    })
  }

}
