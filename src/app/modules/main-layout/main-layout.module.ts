import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { TopbarComponent, MenuComponent, BreadcrumbComponent, DownloadComponent, FooterComponent, TermsComponent, LayoutComponent } from './components';


@NgModule({
  declarations: [
    TopbarComponent,
    MenuComponent,
    BreadcrumbComponent,
    DownloadComponent,
    FooterComponent,
    TermsComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule
  ]
})
export class MainLayoutModule { }
