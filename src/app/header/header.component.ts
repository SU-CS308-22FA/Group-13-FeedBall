import { Component, Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { animationFrameScheduler, Observable, of, switchMap } from 'rxjs';
import { Auth, getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import {MatButtonModule} from '@angular/material/button';
import { messages } from '../models/messages.model';
import { UserDetailComponent } from '../admin_panel/user_detail.component';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { matches } from '../models/matches.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  matchesRef: AngularFirestoreCollection<matches>;
  matches$: Observable<matches[]>;

  constructor(public authService: AuthService,
    private router: Router,
    public leaderboard: LeaderboardComponent,
    public afs: AngularFirestore,
    public auth: AngularFireAuth
    ){
      this.matchesRef = this.afs.collection('matches');
      this.matches$ = this.matchesRef.valueChanges();
    }


  user$ = this.authService.user$;


  user2 = JSON.parse(localStorage.getItem('user')!);



  callLogOut(){
    this.authService.SignOut();
  }
  navigateTeam(){
    this.router.navigate(['team-info']);
  }
  navigateMainPage(){
    this.router.navigate(['feed']);
  }
  navigateProfilePage(){
    this.router.navigate(['profile']);
  }

  navigateAdminPanel(){
    //double check for if user is admin etc.
    this.router.navigate(['admin-panel']);
  }

  navigateLeaderBoard(){
    this.leaderboard.getUsersListAll();
    this.router.navigate(['leaderboard']);
  }

  navigateInMatch(){
    this.router.navigate(['in-match-pre']);
  }
}


@Pipe({ name: 'disableinmatchbuttonpipe' })
export class DisableInMatchButtonPipe implements PipeTransform {
transform(matchesList: matches[]) {

  var retStr: string = "null";
  var size = Object.keys(matchesList).length;

  var noMatchExistsNow: boolean = true;

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

    if (anlik >= dateOf3 && anlik <= ends_at){
      noMatchExistsNow = false;
      return noMatchExistsNow;
    }
  }
  return noMatchExistsNow;
  //search by date among matches list, return the match code

  }


}
