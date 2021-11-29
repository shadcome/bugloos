import { Component, HostListener } from '@angular/core';
import { IMenu } from 'src/app/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  menu: IMenu[] = []
  isStiky: boolean = false


  /**
   * Stick the menu when the scroll goes down
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (document.documentElement.scrollTop > 150) {
      this.isStiky = true
    } else {
      this.isStiky = false
    }
  }

  constructor() {
    this.menu = [
      { title: 'Home', route: '', isActive: true },
      { title: 'My Courses', route: 'my-courses', isActive: false },
      { title: 'Pages', route: '', isActive: false },
      { title: 'Blog', route: '', isActive: false },
      { title: 'Contacts', route: '', isActive: false }
    ]
  }

}
