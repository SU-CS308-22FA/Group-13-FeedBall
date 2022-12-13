import { Component } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
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
import { News } from '../models/news.model';
import { NgForm } from '@angular/forms';
import { Polls } from '../models/polls.model';
import { matches } from '../models/matches.model';





@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin_panel.component.html',
  styleUrls: ['./admin_panel.component.css']
})


export class AdminPanelComponent{

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,

    private authService: AuthService,
    private router: Router
    ){}

    public showMyMessage = false
    user$ = this.authService.user$;


    changePassword(mail: string) {

      this.authService.ForgotPassword(mail);

      setTimeout(() => {
        this.showMyMessage = true
      }, 1000)
    }

  deleteUserAccount(){
    this.authService.userDelete();
    this.authService.SignOut();
  }

  UserInfo(){
    this.router.navigate(["user-detail"]);
  }

  submitForm(form: NgForm, name: any){
    var id = ""
    var created = true;
    const today = new Date();

    var headerFrom = form.value.headerInput;
    var contentFrom = form.value.contentInput;


    let tags: Array<string> = ['Konyaspor'];
    let emptyList: Array<string> = [];
    const sendNews: News = {
      header: headerFrom,
      content: contentFrom,
      newsdate: today,
      writtenby: name,
      tags: tags,
      likes: 0,
      dislikes: 0,
      nid: "",
      likedUsers: emptyList,
      dislikedUsers: emptyList
    }


    this.afs.collection("News").add(sendNews)
    .then((result) => {
      id = result.id;
      console.log("result id: ", result.id, "\n");
      //alert("The new has been added to the news page.")


      this.authService.SetNewId(sendNews, id).then((result2) => {
        console.log("id setted succesfully\n");
      }).catch((error2) => {
        const errorCode2 = error2.code;
        const errorMessage2 = error2.message;

        console.log(errorCode2, errorMessage2);
      });




    })
    .catch((error) => {
      created = false;
      const errorCode = error.code;
      const errorMessage = error.message;


      console.log(errorCode, errorMessage);
    });






    form.resetForm();
  }


  submitPForm(form: NgForm, name: any){
    var id = ""
    var created = true;
    const today = new Date();

    var questionFrom = form.value.questionInput;
    var option1From = form.value.opt1Input;
    var option2From = form.value.opt2Input;
    var option3From = form.value.opt3Input;

    let emptyList: Array<string> = [];
    const sendPolls: Polls = {
      question: questionFrom,
      option1: option1From,
      option2: option2From,
      option3: option3From,
      countOpt1: 0,
      countOpt2: 0,
      countOpt3: 0,
      writtenby: name,
      newsdate: today,
      pid: "",
      UsersPickOpt1: emptyList,
      UsersPickOpt2: emptyList,
      UsersPickOpt3: emptyList
    }

    this.afs.collection("Polls").add(sendPolls)
    .then((result) => {
      id = result.id;
      console.log("result id: ", result.id, "\n");



      this.authService.SetNewPId(sendPolls, id).then((result2) => {
        console.log("id setted succesfully\n");
        alert("The poll has been added to the polls page.");
      }).catch((error2) => {
        const errorCode2 = error2.code;
        const errorMessage2 = error2.message;

        console.log(errorCode2, errorMessage2);
      });




    })
    .catch((error) => {
      created = false;
      const errorCode = error.code;
      const errorMessage = error.message;


      console.log(errorCode, errorMessage);
    });






    form.resetForm();
  }

  postedPollInactive(){             // Got to finish this one. Additionally should give error when no poll is posted but the deactivate button is still pressed.

  }
  public matchesMatch = true;

  submitMatch(form: NgForm){
    if(form.value.Team1Input != form.value.Team2Input){
      this.matchesMatch = true;
    }
    else{
      this.matchesMatch = false;
    }

    if(this.matchesMatch){
    var id = ""
    var convert = form.value.DateInput;
    convert.setHours(form.value.HourInput);
    convert.setMinutes(form.value.MinuteInput);

    var Team1 = form.value.Team1Input;
    var Team2 = form.value.Team2Input;

    const sendMatches: matches = {
      team1: Team1,
      team2: Team2,
      starts_at: convert,
      matchID: "",
      score_team1: 0,
      score_team2: 0,
    }


    this.afs.collection("matches").add(sendMatches)
    .then((result) => {
      id = result.id;
      console.log("result id: ", result.id, "\n");



      this.authService.SetMatchId(sendMatches, id).then((result2) => {
        console.log("id setted succesfully\n");
        alert("The match has been added to the schedule.")
      }).catch((error2) => {
        const errorCode2 = error2.code;
        const errorMessage2 = error2.message;

        console.log(errorCode2, errorMessage2);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  else{
    alert("You can't enter the same team for Team1 and Team2.")
    return;
  }
    form.resetForm();
  }


  DoSmth(){
    //bir sey yapcaz
    this.router.navigate(["user-detail"]);
  }

  adminPanel(){
    this.router.navigate(['admin-panel'])
  }

  navigateMainPage(){
    this.router.navigate(['feed']);
  }

  hours: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11,12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  minutes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11,12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27,28,29,30,31,32,33,34,35,36,37,38,39,
    40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,
    57,58,59]

  teams: string[] = ["Adana Demirspor",
  "Alanyaspor" ,
  "Antalyaspor",
  "Beşiktaş",
  "Fatih Karagümrük",
  "Fenerbahçe",
  "Galatasaray",
  "Gaziantep",
  "Giresunspor",
  "Hatayspor",
  "İstanbul Başakşehir",
  "İstanbulspor",
  "Kasımpaşa",
  "Kayserispor",
  "Konyaspor",
  "MKE Ankaragücü",
  "Sivasspor",
  "Trabzonspor",
  "Ümraniyespor"]

}
