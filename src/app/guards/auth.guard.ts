import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router, private srvSnack: MatSnackBar) { }

  /**
 * This guard checks the user stored in the Local Storage and allows entry if it exists.
 */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(obs => {
      const user = localStorage.getItem('user');
      if (!!user) {
        obs.next(true);
      } else {
        this.srvSnack.open('Please register first .', 'Ok')
        this.route.navigate(['/auth']);
        obs.next(false);
      }
    })
  }

}
