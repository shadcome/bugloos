import { Component, HostListener, OnInit } from '@angular/core';
import { ICourse, IMenu } from 'src/app/interfaces';
import { ObserveService } from 'src/app/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: IMenu[] = []
  isStiky: boolean = false
  basketCourses: ICourse[] = []


  /**
   * Stick the menu when the scroll goes down
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.isStiky = document.documentElement.scrollTop > 150
  }

  constructor(private srvObserve: ObserveService) {
    this.menu = [
      { title: 'Home', route: '', isActive: true },
      { title: 'My Courses', route: 'my-courses', isActive: false },
      { title: 'Pages', route: '', isActive: false },
      { title: 'Blog', route: '', isActive: false },
      { title: 'Contacts', route: '', isActive: false }
    ]
  }

  ngOnInit(): void {
    this.srvObserve.basket$.subscribe(courses => {
      this.basketCourses = courses
    })
  }

}
