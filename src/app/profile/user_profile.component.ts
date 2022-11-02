import { Component } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { animationFrameScheduler } from 'rxjs';
import { getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user_profile.component.html',
  styleUrls: ['./user_profile.component.css']
})
export class UserProfileComponent{

<<<<<<< HEAD
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore){}


  user = this.afAuth.currentUser;

  userRef = this.afs.collection('users')
  .doc("name");

  x=this.userRef;
  y = 5;

=======

  constructor(){

  }


  deleteUserAccount(){
    //call delete fucntion here
  }
>>>>>>> b3ff46356ad07aa4523c3c6fb97104db6596be8f
}
