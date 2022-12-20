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
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { matches } from '../models/matches.model';

@Component({
  selector: 'app-in-match-pre',
  templateUrl: './in-match-pre.component.html',
  styleUrls: ['./in-match-pre.component.css']
})
export class InMatchPreComponent{

  matchesRef: AngularFirestoreCollection<matches>;
  matches$: Observable<matches[]>;

  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router
  ){

    this.matchesRef = this.afs.collection('matches');
    this.matches$ = this.matchesRef.valueChanges();
  }

  user$ = this.authService.user$;

  elemslist: string[] = ["dummyId1", "dummyId2", "dummyId3", "dummyId4"];

  navigateMainPage(){
    this.router.navigate(['feed']);
  }

}

@Pipe({ name: 'returncurrentmatcheslistipe' })
export class ReturnCurrentMatchesListPipe implements PipeTransform {
transform(matchesList: matches[]) {

  var currentMatches: matches[] = [];

  var size = Object.keys(matchesList).length;

  function addMinutes(date:Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  for(let i=0; i<size; i++){

    var star: any = matchesList[i].starts_at;
    var numtimestamp = Number(star.seconds);

    numtimestamp = numtimestamp * 1000;

    const dateOf = new Date(numtimestamp);
    const dateOf2 = dateOf;

    var ends_at = addMinutes(dateOf2, 90);

    const forNow = new Date();
    const dateOf3 = new Date(numtimestamp);

    if (forNow >= dateOf3 && forNow <= ends_at){
      currentMatches.push(matchesList[i]);
    }

  }

  return currentMatches;
  }
}

@Pipe({ name: 'isthereanycurrentmatchpipe' })
export class IsThereAnyCurrentMatchPipe implements PipeTransform {
transform(matchesList: matches[]) {

  var size = Object.keys(matchesList).length;

  if(size > 0){
    return true;
  }
  return false;

  }
}
