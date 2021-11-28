import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'all' },
  { path: 'all', component: CourseListComponent },
  { path: 'user-courses', component: CourseListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
