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

  deleteUserAccount(){}

  user$ = this.authService.user$;


  callLogOut(

  ){}


  navigateMainPage(){
    this.router.navigate(['feed']);
  }

}
