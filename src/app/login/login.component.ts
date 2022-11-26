import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import { OnDestroy, OnInit } from '@angular/core';
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

import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  constructor(
    public authService: AuthService, public router: Router
  )
  {/*
    if(this.authService.user$ != null){
      this.router.navigate(['feed']);
    }*/
  }
  user$ = this.authService.user$;


  ngOnInit(){
    if(this.authService.isLoggedIn){
      console.log("loggedin");
      this.router.navigate(['feed']);
    }
    else{
      console.log("notloggedin");
    }
  }

  ngOnDestroy(): void {

  }

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

  CanActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}
