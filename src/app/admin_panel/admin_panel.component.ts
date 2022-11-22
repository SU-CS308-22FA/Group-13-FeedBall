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
  selector: 'app-admin-profile',
  templateUrl: './admin_panel.component.html',
  styleUrls: ['./admin_panel.component.css']
})
export class AdminPanelComponent{

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,

    private authService: AuthService,
    private router: Router
    ){}

    public showMyMessage = false
    user$ = this.authService.user$;


    changePassword(mail: string) {

      this.authService.ForgotPassword(mail);

      setTimeout(() => {
        this.showMyMessage = true
      }, 1000)
    }

  deleteUserAccount(){
    this.authService.userDelete();
    this.authService.SignOut();
  }

  UserInfo(){
    this.router.navigate(["user-detail"]);
  }


  DoSmth(){
    //bir sey yapcaz
    this.router.navigate(["user-detail"]);
  }

  adminPanel(){
    this.router.navigate(['admin-panel'])
  }

  navigateMainPage(){
    this.router.navigate(['feed']);
  }






}
