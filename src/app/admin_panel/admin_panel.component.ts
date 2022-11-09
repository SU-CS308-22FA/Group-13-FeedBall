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
  selector: 'app-admin-panel',
  templateUrl: './admin_panel.component.html',
  styleUrls: ['./admin_panel.component.css']
})
export class AdminPanelComponent{

  constructor(public authService: AuthService, private router: Router) {}


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

  navigateAdminPanel(){
    //double check for if user is admin etc.
    //this.router.navigate(['admin-panel']);
  }
}
