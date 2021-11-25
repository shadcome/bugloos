import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';

/// Custom components
import { TopbarComponent, MenuComponent, BreadcrumbComponent, DownloadComponent, FooterComponent, TermsComponent, LayoutComponent } from './components';

/// Material Modules
import { MatIconModule } from '@angular/material/icon';

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
    MainLayoutRoutingModule,
    MatIconModule
  ]
})
export class MainLayoutModule { }
