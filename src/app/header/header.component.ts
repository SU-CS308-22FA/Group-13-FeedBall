import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { animationFrameScheduler, of, switchMap } from 'rxjs';
import { Auth, getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(public authService: AuthService, private router: Router) {}


  user$ = this.authService.user$;


  user2 = JSON.parse(localStorage.getItem('user')!);



  callLogOut(){
    this.authService.SignOut();
  }
  navigateMainPage(){
    this.router.navigate(['feed']);
  }
  navigateProfilePage(){
    this.router.navigate(['profile']);
  }

  navigateAdminPanel(){
    //double check for if user is admin etc.
    //this.router.navigate(['admin-panel']);
  }
}
