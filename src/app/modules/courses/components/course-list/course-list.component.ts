import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ICourse } from 'src/app/interfaces';
import { CourseService } from 'src/app/services';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses: ICourse[] = []
  userCourse: boolean = false

  constructor(private srvCourse: CourseService, private router: Router) {
    /**
     * This code has been used to handle user courses or all
     */
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.userCourse = (event.urlAfterRedirects == '/courses/user-courses')
      }
    });
  }

  ngOnInit(): void {
    if (this.userCourse) {
      this.srvCourse.getUserCourses().subscribe(res => {
        this.courses = res;
      })
    } else {
      this.srvCourse.getCourses().subscribe(res => {
        this.courses = res;
      })
    }
  }

}
