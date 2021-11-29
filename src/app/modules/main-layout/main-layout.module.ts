import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';

/// Custom components
import { TopbarComponent, MenuComponent, BreadcrumbComponent, DownloadComponent, FooterComponent, TermsComponent, LayoutComponent, SliderComponent } from './components';

/// Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    TopbarComponent,
    MenuComponent,
    BreadcrumbComponent,
    DownloadComponent,
    FooterComponent,
    TermsComponent,
    LayoutComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule
  ]
})
export class MainLayoutModule { }
