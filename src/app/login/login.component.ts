import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    public authService: AuthService
  )
  {}
  user$ = this.authService.user$;

  onLogin(form: NgForm){

    console.log("in onLogin");
    if(form.invalid){
      return;
    } else{
      this.authService.SignIn(form.value.emailInput, form.value.passwordInput);

    }





    //maybe password rules: 8 chars, etc. etc.

    form.resetForm();
  }

}
