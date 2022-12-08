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

@Component({
  selector: 'app-in-match',
  templateUrl: './in-match.component.html',
  styleUrls: ['./in-match.component.css']
})
export class InMatchComponent{


  messagesRef: AngularFirestoreCollection<messages>;
  messages$: Observable<messages[]>;


  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,
    public auth: AngularFireAuth
  ){
    this.messagesRef = this.afs.collection('messages');
    this.messages$ = this.messagesRef.valueChanges();
    console.log(this.messagesRef);
  }


  user$ = this.authService.user$;

  dummyMatch = "GS:FB/07.12.22/21.30:23.00";
  className = "rightdiv";

  dummyelems: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  onSubmitForm(form: NgForm){

    console.log(form.value.content);



    //this.createMessageAndPushToDatabase();


    form.resetForm();
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
