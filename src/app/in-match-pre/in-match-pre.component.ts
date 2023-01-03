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
import { ReturnSizePipe } from '../leaderboard/leaderboard.component';

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

  teamLogoSrcList: string[] = ["assets/Adanademirspor.png", "assets/Alanyaspor_logo.png", "assets/Antalyaspor_logo.png", "assets/367px-BesiktasJK-Logo.svg.png",
                              "assets/Fatihkaragumruk.png", "assets/Fenerbahçe_SK.png", "assets/Galatasaray_Star_Logo.png",
                              "assets/Gaziantep_FK.png", "assets/Hatayspor.png", "assets/İstanbul_Başakşehir_FK.png", "assets/IstanbulsporAS.png",
                              "assets/Kasimpasa_2012.png", "assets/Kayserispor_logosu.png", "assets/Konyaspor_1922.png",
                            "assets/MKE_Ankaragücü_logo.png","assets/Sivasspor.png", "assets/TrabzonsporAmblemi.png", "assets/Ümraniyespor_Logosu.png"];

  public teamsList: Array<string> = ["Adana Demirspor", "Alanyaspor" , "Antalyaspor", "Beşiktaş", "Fatih Karagümrük", "Fenerbahçe", "Galatasaray",
                                     "Gaziantep", "Giresunspor", "Hatayspor", "İstanbul Başakşehir", "İstanbulspor", "Kasımpaşa", "Kayserispor",
                                     "Konyaspor", "MKE Ankaragücü", "Sivasspor", "Trabzonspor", "Ümraniyespor"];

  navigateMainPage(){
    this.router.navigate(['feed']);
  }

  public currentIndex: number = 0;

  goBack(){
    if(this.currentIndex > 0){
      this.currentIndex--;
    }

  }

  returnPngLink(team1or2: number, matchOf: matches){


    var size = Object.keys(this.teamsList).length;
    if(team1or2 == 1){
      for(let i=0; i<size; i++){
        if(matchOf.team1 == this.teamsList[i]){
          return this.teamLogoSrcList[i];
        }
      }
      return "";
    }
    else{
      for(let i=0; i<size; i++){
        if(matchOf.team2 == this.teamsList[i]){
          return this.teamLogoSrcList[i];
        }
      }
      return "";
    }
  }

  returnSize(theList: matches[]){
    var sizeList = Object.keys(theList).length;
    return sizeList;
  }

  goForward(theList: matches[]){

    var sizeList = this.returnSize(theList);
    if(this.currentIndex < sizeList-1){
      this.currentIndex++;
    }
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
