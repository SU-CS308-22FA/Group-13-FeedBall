import { Component, Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { animationFrameScheduler, of, switchMap } from 'rxjs';
import { Auth, getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { matches } from '../models/matches.model';


@Component({
  selector: 'matches-admin',
  templateUrl: './matches_admin.component.html',
  styleUrls: ['./matches_admin.component.css']
})

export class MatchesAdminComponent{
    matchesRef: AngularFirestoreCollection<matches>;
    matches$: Observable<matches[]>;
    constructor(
        public authService: AuthService,
        public afs: AngularFirestore,
        public auth: AngularFireAuth,
      ){
        this.matchesRef = this.afs.collection('matches');
        this.matches$ = this.matchesRef.valueChanges();
      }
      incrementTeam1(scoringteam: matches){
        this.authService.Team1Scores(scoringteam);
      }
      incrementTeam2(scoringteam: matches){
        this.authService.Team2Scores(scoringteam);
      }

}



@Pipe({ name: 'returnallmatchpipe' })
export class ReturnAllMatchPipe implements PipeTransform {
transform(matchesList: matches[]) {

  var size = Object.keys(matchesList).length;
  function addMinutes(date:Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  var list1: matches[] = [];

    for(let i=0; i<size; i++){
      var star:any = matchesList[i].starts_at;
      var numtimestamp = Number(star.seconds);
      numtimestamp = numtimestamp * 1000;
      const dateOf = new Date(numtimestamp);
      var ends_at = addMinutes(dateOf,90);
      if (true){
        list1.push(matchesList[i]);
        return ends_at;
      }
    }
    return list1;
    //search by date among matches list, return the match code

  }


}

@Pipe({ name: 'todatepipe2' })
export class ToDatePipe2 implements PipeTransform {
  transform(timestamp: any) {

    var numtimestamp = Number(timestamp.seconds);
    numtimestamp = numtimestamp * 1000;
    const dateOf = new Date(numtimestamp);
    var deneme = new Date();
    console.log(deneme.getHours().toString(), deneme.getMinutes().toString());
    deneme.setHours(11);
    deneme.setMinutes(30);
    console.log("after: ", deneme.getHours().toString(), deneme.getMinutes().toString());




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


