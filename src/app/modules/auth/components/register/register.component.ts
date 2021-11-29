import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUserInfo } from 'src/app/interfaces';
import { AuthService, ObserveService } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  termAccepted: boolean = false;
  userInfo: IUserInfo;
  photoFile: File | null;

  constructor(
    private srvSnack: MatSnackBar,
    private srvObserver: ObserveService,
    private srvAuth: AuthService,
    private route: Router) {
    /// Fill userInfo to prevent null errors
    this.userInfo = { name: '', email: '', photo: null, gender: 1 }
    this.photoFile = null

    localStorage.clear()
    this.srvObserver.userLogged(null)
    this.srvObserver.clearBasket()
  }

  /**
   * Capture user image and maintain it
   * @param files 
   * @returns 
   */
  setPhoto(files: any): void {
    if (files.length === 0) {
      return
    }
    this.photoFile = (files[0] as File)

    /// FormData must be sended to server
    const formData = new FormData()
    formData.append('file', this.photoFile, this.photoFile.name)
    this.userInfo.photo = formData
  }

  registerUser(form: NgForm): void {
    if (!form.valid) {
      return
    }
    if (!this.termAccepted) {
      this.srvSnack.open('Please accept the terms.', 'Ok', { duration: 3000 })
      return
    }

    this.srvAuth.register(this.userInfo).subscribe(() => {
      this.srvObserver.userLogged(this.userInfo)
      this.route.navigate(['/'])
    })

  }

}
