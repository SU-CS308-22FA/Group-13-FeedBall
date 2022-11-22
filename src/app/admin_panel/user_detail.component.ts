import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { animationFrameScheduler, of, switchMap } from 'rxjs';
import { Auth, getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-panel',
  templateUrl: './user_detail.component.html',
  styleUrls: ['./user_detail.component.css']
})
export class UserDetailComponent{

  userRef: AngularFirestoreCollection<User>;
  user$: Observable<User[]>;

  constructor(public authService: AuthService,
    private router: Router,
    private afs: AngularFirestore,
    private auth: AngularFireAuth) {
      this.userRef = this.afs.collection('users');
      this.user$ = this.userRef.valueChanges();
    }




  deleteUser(){

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
