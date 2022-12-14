import { Component, Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { animationFrameScheduler, of, switchMap } from 'rxjs';
import { Auth, getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import firebase from 'firebase/compat/app';
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




  deleteUser(uidX: string){
    return this.afs.doc(`users/${uidX}`).update({isBanned: true});
    console.log('User is banned!');
  }

  UnbanUser(uidX: string){
    return this.afs.doc(`users/${uidX}`).update({isBanned: false});
    console.log('User is unbanned!');
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


@Pipe({ name: 'uidcontainslist' })
export class UidContainsListPipe implements PipeTransform {
  transform(deletes: Array<any>, user: String) {
    const size = deletes.length;
    for(let i = 0; i < size; i++){
      if(deletes[i].uid == user){
        return false;
      }
    }
    return true;
  }
}
