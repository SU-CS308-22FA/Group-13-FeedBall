import { Component } from '@angular/core';
import {News} from "src/app/models/news.model"
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { animationFrameScheduler, of, switchMap, Observable } from 'rxjs';
import { Auth, getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { isIntersectionTypeNode, sortAndDeduplicateDiagnostics } from 'typescript';
import {Polls} from "src/app/models/polls.model"
import { appCheckInstanceFactory } from '@angular/fire/app-check/app-check.module';
import { listChanges } from '@angular/fire/compat/database';


@Component({
  selector: 'app-polls',
  templateUrl: './polls_page.component.html',
  styleUrls: ['./polls_page.component.css']


})
export class PollsPageComponent{
  pollsRef: AngularFirestoreCollection<Polls>;
  polls$: Observable<Polls[]>;




  constructor(public authService: AuthService,
    private router: Router,
    private afs: AngularFirestore,
    private auth: AngularFireAuth)
  {
    this.pollsRef = this.afs.collection('Polls');
    this.polls$ = this.pollsRef.valueChanges();
    console.log(this.pollsRef);
  }

  public filterOption = "alldatedesc";
  user$ = this.authService.user$;


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

  checkclick(poll: Polls, option: number, user: User){

    this.authService.incrementPoints(user, 5);
    const newRef: AngularFirestoreDocument<any> = this.afs.doc(`Polls/${poll.pid}`);
    console.log(newRef);

    const theNewPoll: Polls = {
      pollIsActive: poll.pollIsActive,
      pid: poll.pid,
      question: poll.question,
      option1: poll.option1,
      option2: poll.option2,
      option3: poll.option3,
      countOpt1: poll.countOpt1,
      countOpt2: poll.countOpt2,
      countOpt3: poll.countOpt3,
      writtenby: poll.writtenby,
      newsdate: poll.newsdate,
      UsersPickOpt1: poll.UsersPickOpt1,
      UsersPickOpt2: poll.UsersPickOpt2,
      UsersPickOpt3: poll.UsersPickOpt3
    };

    if (option == 1 && !(this.isUserInList(poll.UsersPickOpt1, user))){
      theNewPoll.countOpt1 += 1;
      poll.UsersPickOpt1.push(user.uid);
      let message: string = 'You have picked the first option for this poll.';
      alert(message);
    }
    if (option == 2 && (!this.isUserInList(poll.UsersPickOpt2, user))){
      theNewPoll.countOpt2 += 1;
      poll.UsersPickOpt2.push(user.uid);
      let message: string = 'You have picked the second option for this poll.';
      alert(message);
    }
    if (option == 3 && !(this.isUserInList(poll.UsersPickOpt3, user))){
      theNewPoll.countOpt3 += 1;
      poll.UsersPickOpt3.push(user.uid);
      let message: string = 'You have picked the third option for this poll.';
      alert(message);
    }
    return newRef.set(theNewPoll, { merge: true });

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

  pollIsActiveCheck(poll: Polls){
    if(poll.pollIsActive == true){
      return true;
    }
    else{
      return false;
    }
  }

  userAnsweredPollAlready(poll: Polls, user: User){
    if((this.isUserInList(poll.UsersPickOpt1, user) || this.isUserInList(poll.UsersPickOpt2, user) || this.isUserInList(poll.UsersPickOpt3, user))  == true){
      return true;
    }
    else{
      return false;
    }
  }


}


//pipelines
@Pipe({ name: 'todatepipe2' })
export class ToDatePipe2 implements PipeTransform {
  transform(timestamp: any) {

    var numtimestamp = Number(timestamp.seconds);
    numtimestamp = numtimestamp * 1000;
    const dateOf = new Date(numtimestamp);

    var returnString = "";

    var nummonth = Number(dateOf.getMonth())+1;

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

    returnString = dateOf.getDate().toString() + "." + String(nummonth) + "." +  dateOf.getFullYear().toString()
    + " " + hours + ":" + mins;

    return returnString;

  }
}

@Pipe({ name: 'sortdatedescendingpipep' })
export class SortDateDescendingPipeP implements PipeTransform {
  transform(listUnfiltered: Polls[]) {

    var sortedList: Polls[] = [];

    if(listUnfiltered != null){
      sortedList = listUnfiltered.sort((a, b) => (a.newsdate > b.newsdate ? -1 : 1));
    }

    return sortedList;
  }
}


