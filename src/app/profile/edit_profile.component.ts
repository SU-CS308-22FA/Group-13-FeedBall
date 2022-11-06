import { Component } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { animationFrameScheduler, of, switchMap } from 'rxjs';
import { Auth, getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { format } from 'path';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';



@Component({
  selector: 'app-user-profile',
  templateUrl: './edit_profile.component.html',
  styleUrls: ['./edit_profile.component.css']
})
export class EditProfileComponent{




  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private authService: AuthService,
    private router: Router){

  }

  public showMyMessage = false;
  user$ = this.authService.user$;

  changePassword(mail: string) {

    this.authService.ForgotPassword(mail);

    setTimeout(() => {
      this.showMyMessage = true
    }, 1000)
  }


  callLogOut(){
    this.authService.SignOut();
  }


  navigateMainPage(){
    this.router.navigate(['feed']);
  }

  navigateProfilePage(){
    this.router.navigate(['profile']);
  }

  onEditInfo(form: NgForm){
      if(form.invalid){
        return;
      }
      else{
          if(form.value.nameInput != null){
            this.authService.updateUser("name", form.value.nameInput);
          }
          if(form.value.surnameInput != null){
            this.authService.updateUser("surname", form.value.surnameInput);

          if(form.value.genderInput != null){
            this.authService.updateUser("gender", form.value.genderInput);
          }
          if(form.value.nameInput != null){
            this.authService.updateUser("age", form.value.birthday);

          }
          return;
        }
      }
  }
}


//pipelines
@Pipe({ name: 'todatepipe' })
export class ToDatePipe implements PipeTransform {
transform(timestamp: any) {

  var numtimestamp = Number(timestamp.seconds);
  numtimestamp = numtimestamp * 1000;
  const dateOf = new Date(numtimestamp);

  return dateOf;
  }
}

