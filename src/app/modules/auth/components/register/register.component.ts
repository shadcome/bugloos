import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUserInfo } from 'src/app/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  termAccepted: boolean = false;
  userInfo: IUserInfo;
  photoFile: File | null;

  constructor(private _snackBar: MatSnackBar) {
    /// Fill userInfo to prevent null errors
    this.userInfo = { name: '', email: '', photo: null, gender: 1 }
    this.photoFile = null
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
      this._snackBar.open('Please accept the terms.', 'Ok', { duration: 3000 })
      return
    }
    console.log(this.userInfo)

  }

}
