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

}

@Pipe({ name: 'returncurrentmatchipe' })
export class ReturnCurrentMatchPipe implements PipeTransform {
transform(matchesList: matches[]) {

  var retStr: string = "";
  var size = Object.keys(matchesList).length;
  function addMinutes(date:Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

    for(let i=0; i<size; i++){
      var star:any = matchesList[i].starts_at;
      var numtimestamp = Number(star.seconds);
      numtimestamp = numtimestamp * 1000;
      const dateOf = new Date(numtimestamp);
      const dateOf2 = dateOf;
      var ends_at = addMinutes(dateOf2,90);
      const anlik = new Date();
      const dateOf3 = new Date(numtimestamp);
      if (true){


        return retStr;
      }
    }
    return retStr;
    //search by date among matches list, return the match code

  }
}
