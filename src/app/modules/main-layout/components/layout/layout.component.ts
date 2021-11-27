import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  isHome: boolean = true;

  constructor(private router: Router) {
    /**
     * This code has been used to know where we are now .
     */
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/') {
          this.isHome = true;
        } else {
          this.isHome = false;
        }
      }
    });
  }

}
