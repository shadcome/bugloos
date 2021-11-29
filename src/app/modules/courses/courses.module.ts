import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
/// Components
import { CourseDetailComponent, CourseListComponent } from './components';

/// Services
import { CourseService } from 'src/app/services';

/// Material modules
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatButtonModule
  ],
  providers: [
    CourseService
  ]
})
export class CoursesModule { }
