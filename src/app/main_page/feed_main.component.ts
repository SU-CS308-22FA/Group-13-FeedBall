import { Component, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../shared/services/auth.service";
import { matches } from '../models/matches.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './feed_main.component.html',
  styleUrls: ['./feed_main.component.css']
})
export class FeedMainComponent{

  matchesRef: AngularFirestoreCollection<matches>;
  matches$: Observable<matches[]>;


  constructor(private router: Router,
    private authService: AuthService,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,){
      this.matchesRef = this.afs.collection('matches');
      this.matches$ = this.matchesRef.valueChanges();
    }

  navigateProfilePage(){
    this.router.navigate(['profile']);
  }

  navigateNewsPage(){
    this.router.navigate(['news-page']);
  }
  callLogOut(){
    this.authService.SignOut();
  }

  navigatePollsPage(){
    this.router.navigate(['polls-page']);
  }

}

@Pipe({ name: 'returnfinishedmatchpipe' })
export class ReturnFinishedMatchPipe implements PipeTransform {
transform(matchesList: matches[]) {

  var retStr: string = "";

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
      const dateOf2 = dateOf;
      var ends_at = addMinutes(dateOf2,90);
      const anlik = new Date();
      const dateOf3 = new Date(numtimestamp);
      if (anlik >= ends_at){
        /*retStr = matchesList[i].team1.toString() + "-" + matchesList[i].team2.toString() +"\n" +
        matchesList[i].score_team1.toString() + " - " + matchesList[i].score_team2.toString();*/

        list1.push(matchesList[i]);
      }
    }
    return list1;
    //search by date among matches list, return the match code

  }


}
