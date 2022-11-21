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

  public filterSelection = 10;

  getUsersListAll(){
    this.isButtonClicked = true;
    const vallistUsers = this.authService.getAllUsers();
    this.listUsers = vallistUsers;
    console.log(this.listUsers == null);
  }

  ngOnInit(){
    const vallistUsers = this.authService.getAllUsers();
    this.listUsers = vallistUsers;
  }

  ngOnDestroy(): void{
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

@Pipe({ name: 'returnxthpipe' })
export class ReturnXthPipe implements PipeTransform {
transform(listOf: LeaderboardElems[], index: number) {

  var toReturn = "";
  toReturn = listOf[index-1].userName +  " " + listOf[index-1].userSurname + " - " + listOf[index-1].userPoint + " Points";

  return toReturn;
  }
}

@Pipe({ name: 'returnifxthpipe' })
export class ReturnIfXthPipe implements PipeTransform {
transform(listOf: LeaderboardElems[], index: number, user: User) {

  if(listOf[index-1].userUid == user.uid){
    return true;
  }
  return false;
  }
}


@Pipe({ name: 'returnrankuserpipe'})
export class ReturnRankUserPipe implements PipeTransform {
transform(listOf: LeaderboardElems[], user: User) {
  var strReturn = "";
  var size = Object.keys(listOf).length;
  for(let i=0; i<size; i++){
    if(listOf[i].userUid == user.uid){
      if(listOf[i].userRank < 4){
        strReturn = "Congratulations, " + user.name + "! You are currently ranked #" + listOf[i].userRank;
      }
      else{
        strReturn = user.name + ", you are currently ranked #" + listOf[i].userRank;
      }
    }
  }
  return strReturn;
  }
}

