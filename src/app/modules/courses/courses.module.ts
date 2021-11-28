import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseListComponent } from './components';
import { CourseService } from 'src/app/services';


@NgModule({
  declarations: [
    CourseListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ],
  providers: [
    CourseService
  ]
})
export class CoursesModule { }
