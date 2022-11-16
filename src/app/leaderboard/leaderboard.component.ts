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
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';


interface LeaderboardElems {
  userName: string,
  userSurname: string,
  userUid: string,
  userPoint: number
}


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent{


  public listUsers = this.authService.getAllUsers();

  constructor(
    public authService: AuthService){}
  user$ = this.authService.user$;

  getUsersListAll(){
    const vallistUsers = this.authService.getAllUsers();
    this.listUsers = vallistUsers;
  }

}

//pipelines
@Pipe({ name: 'transformpipe' })
export class TransformPipe implements PipeTransform {
transform(listOf: any) {

  //uid name surname point sorted by point
  var listType: Array<LeaderboardElems> = [];
  var size = Object.keys(listOf).length;
  for(let i=0; i<size; i++){
    var model = listOf[i];

    var elem: LeaderboardElems = {
      userName: "",
      userSurname: "",
      userPoint: 0,
      userUid: ""
    }

    elem.userName = model.name;
    elem.userSurname = model.surname;
    elem.userUid = model.uid;
    elem.userPoint = model.point;

    listType.push(elem);
  }


  var sortedList: LeaderboardElems[] = listType.sort((obj1, obj2) => {
    if(obj1.userPoint > obj2.userPoint){return -1;}
    if(obj1.userPoint < obj2.userPoint){return 1;}
    return 0;
  });

  return sortedList;
  }
}

