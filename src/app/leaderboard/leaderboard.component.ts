import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import { Subscription } from 'rxjs';

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
  userPoint: number,
  userRank: number
}


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  public listUsers = this.ngOnInit();
  public isButtonClicked: boolean = false;
  constructor(public authService: AuthService){}

  getUsersListAll(){
    this.isButtonClicked = true;
    const vallistUsers = this.authService.getAllUsers();
    this.listUsers = vallistUsers;
  }

  ngOnInit(){
    const vallistUsers = this.authService.getAllUsers();
    this.listUsers = vallistUsers;
  }

  ngOnDestroy(): void {
  }

  user$ = this.authService.user$;
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
      userUid: "",
      userRank: -1
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

  for (let j=0; j<size; j++){
    sortedList[j].userRank = j+1; //1st, 2nd, 3rd...
  }

  return sortedList;
  }
}

@Pipe({ name: 'returnsizepipe' })
export class ReturnSizePipe implements PipeTransform {
transform(listOf: any) {

  var size = Object.keys(listOf).length;
  return size;
  }
}

@Pipe({ name: 'return3rdpipe' })
export class Return3rdPipe implements PipeTransform {
transform(listOf: any) {

  var size = Object.keys(listOf).length;
  return size;
  }
}

@Pipe({ name: 'return1stpipe' })
export class Return1stPipe implements PipeTransform {
transform(listOf: any) {

  var size = Object.keys(listOf).length;
  return size;
  }
}

@Pipe({ name: 'return2ndpipe' })
export class Return2ndPipe implements PipeTransform {
transform(listOf: any) {

  var size = Object.keys(listOf).length;
  return size;
  }
}

