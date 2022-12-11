import { Component, Pipe, PipeTransform } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import {MatButtonModule} from '@angular/material/button';
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { animationFrameScheduler, Observable, of, switchMap } from 'rxjs';
import { Auth, getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { messages } from '../models/messages.model';
import { UserDetailComponent } from '../admin_panel/user_detail.component';

@Component({
  selector: 'app-in-match',
  templateUrl: './in-match.component.html',
  styleUrls: ['./in-match.component.css']
})
export class InMatchComponent{


  messagesRef: AngularFirestoreCollection<messages>;
  messages$: Observable<messages[]>;

  usersRef: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;


  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
  ){
    this.messagesRef = this.afs.collection('messages');
    this.messages$ = this.messagesRef.valueChanges();


    //get matches list, apply async on frontend, then a pipeline to match a match time to current time, when found, dummyMathch will be assigned accordingly maybe with a function.

    this.usersRef = this.afs.collection('users');
    this.users$ = this.usersRef.valueChanges();
  }


  user$ = this.authService.user$;

  currentMatch = "GS:FB/07.12.22/21.30:23.00";
  className = "rightdiv";

  dummyelems: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  onSubmitForm(form: NgForm, user: User){

    console.log(form.value.content);
    if(form.valid){
      var message = form.value.content;
      const now = new Date();
      this.createMessageAndPushToDatabase(message, now, user, this.currentMatch);
    }
    else{
      return;
    }

    form.resetForm();
  }

  isUserInList(theList: Array<String>, user: User){
    var size = Object.keys(theList).length;
    if(size>0){
      for(let i=0; i<size; i++){
        if(theList[i] == user.uid){
          return true;
        }
      }
      return false;
    }
    else{
      return false;
    }
  }

  ReturnUser(uidUser: string, userList: Array<User>){

    var size = Object.keys(userList).length;
    if(size>0){
      for(let i=0; i<size; i++){
        if(userList[i].uid == uidUser){
          return userList[i];
        }
      }
    }
    var now = new Date();
    const nullUser: User = {
      uid: "",
      email: "",
      displayName: "",
      photoURL: "",
      emailVerified: false,
      name: "",
      surname: "",
      gender: "",
      age: now,
      point: 0,
      team: "",
      isAdmin: false,
    };
    return nullUser;
  }

  returnListWithout(theList: Array<String>, theElem: String){
    var size = Object.keys(theList).length;
    var copyList: Array<String> = [];

    for(let i=0; i<size; i++){
      if(theList[i] != theElem){
        copyList.push(theList[i]);
      }
    }

    return copyList;
  }

  likeMessage(msg: messages, userLiking: User, userMessageOwner: User){

    if(!this.isUserInList(msg.likeList, userLiking)){

      this.authService.incrementPoints(userLiking, 5);
      this.authService.incrementPoints(userMessageOwner, 15);


      var newList: Array<String> = msg.likeList;
      newList.push(userLiking.uid);
      var newLikeNum: number = msg.likeNumber + 1;

      this.authService.LikeUnlikeMessage(msg, newLikeNum, newList, msg.mid);
    }
    else{
      return;
    }
    //increment like
    //increment liking user's point
    //increment message owner's point
  }

  unlikeMessage(msg: messages, userUnliking: User, userMessageOwner: User){

    if(this.isUserInList(msg.likeList, userUnliking)){

      this.authService.decrementPoints(userUnliking, 5);
      this.authService.decrementPoints(userMessageOwner, 15);


      var newList = this.returnListWithout(msg.likeList, userUnliking.uid);
      var newLikeNum: number = msg.likeNumber - 1;

      this.authService.LikeUnlikeMessage(msg, newLikeNum, newList, msg.mid);
    }
    else{
      return;
    }
    //decrement like
    //decrement liking user's point
    //decrement message owner's point

  }


  createMessageAndPushToDatabase(messageContent: string, messageDate: Date, user: User, currentMatchCode: string){

    let emptyList: Array<String> = [];
    let id = "";

    const sendMessage: messages = {
      mid: "",
      matchCode: currentMatchCode,
      messageOwnerID: user.uid,
      messageOwnerName: user.name,
      messageOwnerSurname: user.surname,
      sentWhen: messageDate,
      content: messageContent,
      likeNumber: 0,
      likeList: emptyList,

    }

    this.afs.collection("messages").add(sendMessage).then((result) => {

      id = result.id;
      console.log("result id: ", result.id, "\n");

      this.authService.SetMessageId(sendMessage, id).then((result2) => {

        console.log("id setted succesfully\n");

      }).catch((error2) => {

        const errorCode2 = error2.code;
        const errorMessage2 = error2.message;
        console.log(errorCode2, errorMessage2);

      });
    })
    .catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });

    this.authService.incrementPoints(user, 10);


  }

}



@Pipe({ name: 'hoursminutespipe'})
export class HoursMinutesPipe implements PipeTransform {
transform(timestamp: any) {

  var numtimestamp = Number(timestamp.seconds);
  numtimestamp = numtimestamp * 1000;
  const dateOf = new Date(numtimestamp);
  var returnStr = "";

  var mins = dateOf.getMinutes().toString();
  if(Object.keys(mins).length < 2){
    mins = "0" + mins;
  }
  if(Object.keys(mins).length < 1){
    mins = "00" + mins;
  }

  var hours = dateOf.getHours().toString();
  if(Object.keys(hours).length < 2){
    hours = "0" + hours;
  }
  if(Object.keys(hours).length < 1){
    hours = "00" + hours;
  }


  returnStr = hours + ":" + mins;


  return returnStr;
  }
}


@Pipe({ name: 'sortbydatepipe'})
export class SortByDatePipe implements PipeTransform {
  transform(listNotSorted: messages[]) {

    var sortedList: messages[] = [];

    if(listNotSorted != null){
      sortedList = listNotSorted.sort((a, b) => (a.sentWhen < b.sentWhen ? -1 : 1));
    }

    return sortedList;

  }
}

@Pipe({ name: 'pluralpipe'})
export class PluralPipe implements PipeTransform {
  transform(count: number) {

    if (count == 1){
      return "";
    }
    else{
      return "s";
    }

  }
}


@Pipe({ name: 'isuserinlikedlistofmessagepipe' })
export class IsUserInLikedListOfMessagePipe implements PipeTransform {
  transform(msg: messages, user: User) {

    var size = Object.keys(msg.likeList).length;
    if(size>0){
      for(let i=0; i<size; i++){
        if(msg.likeList[i] == user.uid){
          return true;
        }
      }
      return false;
    }
    else{
      return false;
    }

  }
}

@Pipe({ name: 'returnuserpipe' })
export class ReturnUserPipe implements PipeTransform {
transform(uidUser: string, userList: Array<User>) {

  var size = Object.keys(userList).length;
  if(size>0){
    for(let i=0; i<size; i++){
      if(userList[i].uid == uidUser){
        return userList[i];
      }
    }
  }
  return null;

  }
}

@Pipe({ name: 'displaymessagesonlyformcurrentmatchipe' })
export class DisplayMessagesOnlyFromCurrentMatchPipe implements PipeTransform {
transform(mesgList: messages[], currentMatchString: string) {

  var returnList: messages[] = [];
  var size = Object.keys(mesgList).length;

  for(let i=0; i<size; i++){
    if(mesgList[i].matchCode == currentMatchString){
      returnList.push(mesgList[i]);
    }
  }

  return returnList;
  }
}


