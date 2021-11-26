import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: IMenu[] = [];

  constructor() {
    this.menu = [
      { title: 'Home', route: '', isActive: true },
      { title: 'My Courses', route: 'my-courses', isActive: false },
      { title: 'Pages', route: '', isActive: false },
      { title: 'Blog', route: '', isActive: false },
      { title: 'Contacts', route: '', isActive: false }
    ]
  }

  ngOnInit(): void {

  }

}
