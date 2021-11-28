import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  constructor(private srvCourse: CourseService) { }

  ngOnInit(): void {
    this.srvCourse.getCourses().subscribe(res => {
      console.log(res);
      
    })
  }

}
