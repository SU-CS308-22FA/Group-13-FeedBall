import { Injectable, NgZone, QueryList } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserProfileComponent } from 'src/app/profile/user_profile.component';
import { switchMap, of, Observable } from 'rxjs';
import * as firebase from 'firebase/compat';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { isNamedExportBindings, NumberLiteralType } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data


  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        //this.SetUserData2(result.user);
        this.afAuth.authState.subscribe((user) => {
          //this.SetUserData2(result.user);
          if (user) {
            if(user.emailVerified){
              this.router.navigate(['news-page']);
            }else{
              this.SignOut();
              window.alert('You did not verify your mail adress, please check your inbox.');
            }
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string, name: string, surname: string, gender: string, age: Date, point: number, team: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SetUserData(result.user, name, surname, gender, age, point, team);
        this.SendVerificationMail();
        this.SignOut();

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        window.alert('Verification email sent, check your inbox.');
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        const dummyDate = new Date(2022,11,2);
        //this.SetUserData(result.user, "", "", "", dummyDate, 0, "");
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any, name: string, surname: string, gender: string, age: Date, point: number, team: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      name: name,
      surname: surname,
      gender: gender,
      age: age,
      point: point,
      team: team,
      isAdmin: false,
      //password: pass
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  SetUserData2(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      name: user.name,
      surname: user.surname,
      gender: user.gender,
      age: user.age,
      point: user.point,
      team: user.team,
      isAdmin: user.isAdmin,
      //password: user.password
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  user$ = this.afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );

  collectionResult: any;

  userDelete(){
    this.afAuth.currentUser.then(user => user?.delete());
  }

  updateUser(fieldName: string, newValue: any){
    console.log("in update user");
    this.afAuth.authState.pipe(
      switchMap(user => {
        console.log("in switchmap");
        if (user) {
          console.log("in if");
          return this.afs.doc<any>(`users/${user.uid}`).update({fieldName: newValue});
        } else {
          console.log("in else");
          return of(null);
        }
      })
    );
  }

  confirmPassword(confCode: string, newPass: string){
    return this.afAuth.confirmPasswordReset(confCode, newPass)
    .then(() => {
      // Password has been reset!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  resetPassword(email: string){
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }



  updateUserData2(fbUser: User, ageGiven: Date, nameGiven: string, surnameGiven: string, genderGiven: string, pointGiven: number, teamGiven: string) {



    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${fbUser?.uid}`
    );

    const user: User = {
      uid: fbUser.uid,
      email: fbUser.email,
      displayName: fbUser.displayName,
      photoURL: fbUser.photoURL,
      emailVerified: fbUser.emailVerified,
      name: nameGiven,
      surname: surnameGiven,
      gender: genderGiven,
      age: ageGiven,
      point: pointGiven,
      team: teamGiven,
      isAdmin: fbUser.isAdmin
      //password: fbUser.password
    };

    return userRef.set(user, { merge: true });
  }




  incrementPoints(userCurrent: User, pointToIncrement: number){ //points to incrememt will be given by the activity type that the user did, in related ts file

    var sumpoint = userCurrent.point + pointToIncrement;
    this.updateUserData2(userCurrent, userCurrent.age, userCurrent.name, userCurrent.surname, userCurrent.gender, sumpoint, userCurrent.team);
  }


  getAllUsers()/*:Observable<User>*/{

    this.afs.collection("users").valueChanges().subscribe(val =>
      {this.collectionResult = val;});
      return this.collectionResult;
  }

}
