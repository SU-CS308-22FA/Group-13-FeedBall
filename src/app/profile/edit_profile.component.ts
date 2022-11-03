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
import { NgForm } from '@angular/forms';



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


  user$ = this.authService.user$;


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

    }
  }

  onSignUp(form: NgForm){
    console.log("in onSignUp");
    if(form.invalid){
      return;
    }
  }
}
