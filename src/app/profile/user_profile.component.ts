import { Component } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { animationFrameScheduler, of, switchMap } from 'rxjs';
import { Auth, getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';





@Component({
  selector: 'app-user-profile',
  templateUrl: './user_profile.component.html',
  styleUrls: ['./user_profile.component.css']
})
export class UserProfileComponent{

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,

    private authService: AuthService,
    private router: Router
    ){}

    public showMyMessage = false

    changePassword() {

      setTimeout(() => {
        this.showMyMessage = true
      }, 1000)
    }

  deleteUserAccount(){
    this.authService.userDelete();
    this.authService.SignOut();
  }

  editUserInfo(){
    this.router.navigate(["edit-profile"]);
  }

  user$ = this.authService.user$;


  callLogOut(){
    this.authService.SignOut();
  }


  navigateMainPage(){
    this.router.navigate(['feed']);
  }


}
