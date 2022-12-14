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
import { News } from 'src/app/models/news.model';
import { messages } from 'src/app/models/messages.model';
import { ReturnRankUserPipe } from 'src/app/leaderboard/leaderboard.component';
import { matches } from 'src/app/models/matches.model';
import { Polls } from 'src/app/models/polls.model';

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
              this.router.navigate(['feed']);
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
  /**
   *  Setting up user data when sign in with username/password.
   *  @param user User Interface Document
   *  @param name User's name
   *  @param surname User's surname
   *  @param gender User's gender
   *  @param age User's birthday
   *  @param point User's point
   *  @param team User's team
   *  @returns user data collection (interface)
   */
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
      isBanned: false
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
      isBanned: user.isBanned
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
      isAdmin: fbUser.isAdmin,
      isBanned: false
      //password: fbUser.password
    };

    return userRef.set(user, { merge: true });
  }

  Team1Scores(scoringteam: matches){
    var increment = scoringteam.score_team1 + 1;
    this.afs.collection("matches").doc(scoringteam.matchID).update({"score_team1": increment});
  }

  Team2Scores(scoringteam: matches){
    var increment = scoringteam.score_team2 + 1;
    this.afs.collection("matches").doc(scoringteam.matchID).update({"score_team2": increment});
  }

  incrementPoints(userCurrent: User, pointToIncrement: number){ //points to incrememt will be given by the activity type that the user did, in related ts file

    var sumpoint = userCurrent.point + pointToIncrement;
    this.updateUserData2(userCurrent, userCurrent.age, userCurrent.name, userCurrent.surname, userCurrent.gender, sumpoint, userCurrent.team);
  }

  decrementPoints(userCurrent: User, pointToIncrement: number){ //points to incrememt will be given by the activity type that the user did, in related ts file

    var sumpoint = userCurrent.point - pointToIncrement;
    this.updateUserData2(userCurrent, userCurrent.age, userCurrent.name, userCurrent.surname, userCurrent.gender, sumpoint, userCurrent.team);
  }


  getAllUsers()/*:Observable<User>*/{

    this.afs.collection("users").valueChanges().subscribe(val =>
      {this.collectionResult = val;});
      return this.collectionResult;
  }


  SetNewId(news: News, idGiven: string){

    const newRef: AngularFirestoreDocument<any> = this.afs.doc(`News/${idGiven}`);

    console.log(newRef);

    const theNew: News = {
      nid: idGiven,
      header: news.header,
      content: news.content,
      writtenby: news.writtenby,
      newsdate: news.newsdate,
      tags: news.tags,
      likes: news.likes,
      dislikes: news.dislikes,
      likedUsers: news.likedUsers,
      dislikedUsers: news.dislikedUsers
    };
    console.log("added id to news: ", theNew.nid);

    return newRef.set(theNew, { merge: true });
  }

  SetMatchId(theMatch: matches, idGiven: string){

    const matchRef: AngularFirestoreDocument<any> = this.afs.doc(`matches/${idGiven}`);

    console.log(matchRef);

    const theMatchObj: matches = {
      team1: theMatch.team1,
      team2: theMatch.team2,
      starts_at: theMatch.starts_at,
      matchID: idGiven,
      score_team1: theMatch.score_team1,
      score_team2: theMatch.score_team2
    };
    console.log("added id to match: ", theMatchObj.matchID);

    return matchRef.set(theMatchObj, { merge: true });
  }

  SetMessageId(message: messages, idGiven: string){
    const newRef: AngularFirestoreDocument<any> = this.afs.doc(`messages/${idGiven}`);

    console.log(newRef);

    const theMessage: messages = {
      mid: idGiven,
      content: message.content,
      matchCode: message.matchCode,
      messageOwnerID: message.messageOwnerID,
      messageOwnerName: message.messageOwnerName,
      messageOwnerSurname: message.messageOwnerSurname,
      sentWhen: message.sentWhen,
      likeNumber: message.likeNumber,
      likeList: message.likeList
    }

    console.log("added id to message", theMessage.mid);

    return newRef.set(theMessage, { merge: true});
  }


  LikeDislikePost(news: News, likeGiven: number, dislikeGiven: number, likeListGiven: Array<String>, dislikeListGiven: Array<String>, idGiven: string){ //like, take like back, dislike, take dislike back

    const newRef: AngularFirestoreDocument<any> = this.afs.doc(`News/${idGiven}`);
    console.log(newRef);

    const theNewNew: News = {
      nid: news.nid,
      header: news.header,
      content: news.content,
      writtenby: news.writtenby,
      newsdate: news.newsdate,
      tags: news.tags,
      likes: likeGiven,
      dislikes: dislikeGiven,
      likedUsers: likeListGiven,
      dislikedUsers: dislikeListGiven
    };

    return newRef.set(theNewNew, { merge: true });
  }


  LikeUnlikeMessage(message: messages, likeGiven: number, likeListGiven: Array<String>, midGiven: string){

    const newRef: AngularFirestoreDocument<any> = this.afs.doc(`messages/${midGiven}`);


    const theNewMesg: messages = {
      mid: midGiven,
      content: message.content,
      matchCode: message.matchCode,
      messageOwnerID: message.messageOwnerID,
      messageOwnerName: message.messageOwnerName,
      messageOwnerSurname: message.messageOwnerSurname,
      sentWhen: message.sentWhen,
      likeNumber: likeGiven,
      likeList: likeListGiven
    }


    return newRef.set(theNewMesg, { merge: true });
  }

  SetNewPId(polls: Polls, idGiven: string){

    const newRef: AngularFirestoreDocument<any> = this.afs.doc(`Polls/${idGiven}`);

    console.log(newRef); // stuck

    const thePoll: Polls = {
      pid: idGiven,
      question: polls.question,
      option1: polls.option1,
      option2: polls.option2,
      option3: polls.option3,
      countOpt1: polls.countOpt1,
      countOpt2: polls.countOpt2,
      countOpt3: polls.countOpt3,
      writtenby: polls.writtenby,
      newsdate: polls.newsdate,
      UsersPickOpt1: polls.UsersPickOpt1,
      UsersPickOpt2: polls.UsersPickOpt2,
      UsersPickOpt3: polls.UsersPickOpt3


    };
    console.log("added id to news: ", thePoll.pid);

    return newRef.set(thePoll, { merge: true });
  }

}
