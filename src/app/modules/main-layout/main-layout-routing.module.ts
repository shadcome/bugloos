import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'auth', loadChildren: () => import('../../modules').then(m => m.AuthModule) },
      { path: 'error', loadChildren: () => import('../../modules').then(m => m.ErrorsModule) },
      { path: 'courses', loadChildren: () => import('../../modules').then(m => m.CoursesModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
