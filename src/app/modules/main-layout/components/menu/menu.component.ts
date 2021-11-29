import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { ICourse, IMenu, IUserInfo } from 'src/app/interfaces';
import { CourseService, ObserveService } from 'src/app/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: IMenu[] = []
  isStiky: boolean = false
  basketCourses: ICourse[] = []
  userInfo: IUserInfo | null = null


  /**
   * Stick the menu when the scroll goes down
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.isStiky = document.documentElement.scrollTop > 150
  }

  constructor(
    private router: Router,
    private srvSnack: MatSnackBar,
    private srvObserve: ObserveService,
    private srvCourse: CourseService) {
    this.menu = [
      { title: 'Home', route: '/courses/all', isActive: false },
      { title: 'My Courses', route: '/courses/user-courses', isActive: false },
      { title: 'Pages', route: '', isActive: false },
      { title: 'Blog', route: '', isActive: false },
      { title: 'Contacts', route: '', isActive: false }
    ]

    /**
     * This code has been used to set active menu
     */
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menu.forEach(menu => {
          menu.isActive = false
        });
        const menu = this.menu.find(m => m.route == event.urlAfterRedirects)
        if (menu) {
          menu.isActive = true
        }
      }
    });
  }

  /**
   * Here we listen to user purchases and login
   */
  ngOnInit(): void {
    this.srvObserve.basket$.subscribe(courses => {
      this.basketCourses = courses
    })

    this.srvObserve.userLogin$.subscribe(userInfo => {
      this.userInfo = userInfo
    })
  }

  addToUserCourses(): void {
    this.srvCourse.addUserCourses(this.basketCourses).subscribe((res) => {
      this.srvSnack.open('Done !', 'Ok', { duration: 1000 })
      this.srvObserve.clearBasket()
    })
  }

}
