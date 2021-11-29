import { Component } from '@angular/core';
import { ObserveService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * When the page is refreshed, check if the user is logged in or not
   */
  constructor(private srvObserver: ObserveService) {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      this.srvObserver.userLogged(JSON.parse(userInfo))      
    }
  }
}
