import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * We use the Lazy Load structure in this project and we have four modules that mainLyout module is above all. 
 * if we have another module like dashboard it should be set here. 
 */
const routes: Routes = [
  { path: '', loadChildren: () => import('./modules').then(m => m.MainLayoutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
