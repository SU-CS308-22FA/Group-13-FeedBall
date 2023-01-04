import { Component, OnInit } from '@angular/core';

import { AuthService } from "../shared/services/auth.service";
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
import { News } from '../models/news.model';
import { NgForm } from '@angular/forms';
import { Polls } from '../models/polls.model';
import { matches } from '../models/matches.model';
import { InMatchPolls } from '../models/inmatchpolls.model';
import {FormControl} from '@angular/forms';
import { commentary } from '../models/commentary.model';
import { teams } from '../models/teams.model';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  teamLogoSrcList: string[] = ["assets/Adanademirspor.png", "assets/Alanyaspor_logo.png", "assets/Antalyaspor_logo.png", "assets/367px-BesiktasJK-Logo.svg.png",
                              "assets/Fatihkaragumruk.png", "assets/Fenerbahçe_SK.png", "assets/Galatasaray_Star_Logo.png",
                              "assets/Gaziantep_FK.png", "assets/Giresunspor.png", "assets/Hatayspor.png", "assets/İstanbul_Başakşehir_FK.png", "assets/IstanbulsporAS.png",
                              "assets/Kasimpasa_2012.png", "assets/Kayserispor_logosu.png", "assets/Konyaspor_1922.png",
                            "assets/MKE_Ankaragücü_logo.png","assets/Sivasspor.png", "assets/TrabzonsporAmblemi.png", "assets/Ümraniyespor_Logosu.png"];

  public teamsList: Array<string> = ["Adana Demirspor", "Alanyaspor" , "Antalyaspor", "Beşiktaş", "Fatih Karagümrük", "Fenerbahçe", "Galatasaray",
                                     "Gaziantep", "Giresunspor", "Hatayspor", "İstanbul Başakşehir", "İstanbulspor", "Kasımpaşa", "Kayserispor",
                                     "Konyaspor", "MKE Ankaragücü", "Sivasspor", "Trabzonspor", "Ümraniyespor"];


  teamsRef: AngularFirestoreCollection<teams>;
  teams$: Observable<teams[]>;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,

    private authService: AuthService,
    private router: Router) {
      this.teamsRef = this.afs.collection('teamInfos');
      this.teams$ = this.teamsRef.valueChanges();
     }

  ngOnInit(): void {

  }
  returnPngLink(teamname: string){
    var size = Object.keys(this.teamsList).length;
    for(let i=0; i<size; i++){
      if(teamname == this.teamsList[i]){
        return this.teamLogoSrcList[i];
      }
    }
    return "";
  }


}
