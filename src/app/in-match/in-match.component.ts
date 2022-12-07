import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";

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
import { Messages } from '../models/messages.model';

@Component({
  selector: 'app-in-match',
  templateUrl: './in-match.component.html',
  styleUrls: ['./in-match.component.css']
})
export class InMatchComponent{

  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,
  ){}
  user$ = this.authService.user$;

  className = "rightdiv";

  dummyelems: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  onSubmitForm(){


    //this.createMessageAndPushToDatabase();
  }



  createMessageAndPushToDatabase(messageContent: string, messageDate: Date, userID: string, currentMatchCode: string){

    let emptyList: Array<String> = [];
    let id = "";

    const sendMessage: Messages = {
      mid: "",
      matchCode: currentMatchCode,
      messageOwnerID: userID,
      sentWhen: messageDate,
      content: messageContent,
      likeNumber: 0,
      dislikeNumber: 0,
      likeList: emptyList,
      dislikeList: emptyList
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
