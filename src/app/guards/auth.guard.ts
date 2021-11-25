import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router) { }

  /**
 * This guard checks the token stored in the Local Storage and allows entry if it exists.
 */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(obs => {
      const token = localStorage.getItem('token');
      if (!!token) {
        obs.next(true);
      } else {
        this.route.navigate(['/auth']);
        obs.next(false);
      }
    })
  }

}
