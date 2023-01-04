import { Component } from '@angular/core';
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




@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin_panel.component.html',
  styleUrls: ['./admin_panel.component.css']
})


export class AdminPanelComponent{


  matchesRef: AngularFirestoreCollection<matches>;
  matches$: Observable<matches[]>;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,

    private authService: AuthService,
    private router: Router
    ){
      this.matchesRef = this.afs.collection('matches');
      this.matches$ = this.matchesRef.valueChanges();
      this.matches$.forEach(data =>{
        data.forEach(nX =>{
          if(this.currMatch(nX.starts_at)){
            var mtc = "";
            mtc += nX.team1;
            mtc += " - "
            mtc += nX.team2;
            this.myMatch.push(mtc);
            this.myMatchID.push(nX.matchID);
          }
        })

      })


    }

    public showMyMessage = false
    user$ = this.authService.user$;

    public types: Array<String> = ["yellow","red","change","comment","whistle"];
    public teamsList: Array<string> = [
    "Adana Demirspor",
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
    "Ümraniyespor"
    ];

    public myMatch: Array<String> = [];
    public myMatchID: Array<String> = []

    /**
    * This function resets the password
    */
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

  deneme(mama: String){
    for(let i = 0; i < this.myMatch.length; i++){
      if(this.myMatch[i] == mama){
        return this.myMatchID[i];
      }
    }
    return "errorID";

  }

  MatchesInfo(){
    this.router.navigate(["matches-admin"]);
  }

  submitForm(form: NgForm, name: any){
    var id = ""
    var created = true;
    const today = new Date();

    var headerFrom = form.value.headerInput;
    var contentFrom = form.value.contentInput;

    var unsplitted: string = form.value.tagsInput;
    var splittedArray: Array<string> = unsplitted.toString().split(",");


    let tags: Array<string> = splittedArray;
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



      this.authService.SetNewId(sendNews, id).then((result2) => {
        console.log("id setted succesfully\n");
        alert("The new has been added to the news page.")
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

  currMatch(matchStart: Date){
    function addMinutes(date:Date, minutes:number) {
      date.setMinutes(date.getMinutes() + minutes);
      return date;
    }
    var star: any = matchStart;
    var numtimestamp = Number(star.seconds);

    numtimestamp = numtimestamp * 1000;

    const dateOf = new Date(numtimestamp);
    const dateOf2 = dateOf;

    var ends_at = addMinutes(dateOf2, 90);

    const forNow = new Date();
    const dateOf3 = new Date(numtimestamp);

    if (forNow >= dateOf3 && forNow <= ends_at){
      return true;
    }
    else{
      return false;
    }
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
      pollIsActive: true,
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


  openInMatchPoll(formInMatch: NgForm){
    if(formInMatch.invalid){
      return;
    }
    else{
      var id = "";
      var created = true;
      const today = new Date();

      let emptyList: Array<string> = [];
      const sendInMatchPoll: InMatchPolls = {
        impid: "",
        writtenBy: "TFF",
        dateWritten: today,
        matchId: formInMatch.value.matchInput,
        pollText: formInMatch.value.pollTextInput,
        option1: formInMatch.value.opt1Input,
        option2: formInMatch.value.opt2Input,
        option3: formInMatch.value.opt3Input,
        option1Count: 0,
        option2Count: 0,
        option3Count: 0,
        option1UserList: emptyList,
        option2UserList: emptyList,
        option3UserList: emptyList
      }

      this.afs.collection("InMatchPolls").add(sendInMatchPoll)
      .then((result) => {
        id = result.id;
        console.log("result id: ", result.id, "\n");

        this.authService.SetIdInMatchPoll(sendInMatchPoll, id).then((result2) => {
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
    }

    formInMatch.resetForm();
  }

  PollInactive(){
    this.router.navigate(["admin-polls"]);
  }

  PrizePage(){
    this.router.navigate(["prize-page"]);
  }
  public matchesMatch = true;



  /**
   * Description:
   * Sends the details of the match to the firebase. This function lets admins create matches which will later on be used in the in-match page.
   * @param form This form contains the parameters taken from the form in the admin panel. The form is called when clicked on Log the Match. The parameters within the form are team1 and team2, date, hour and minutes.
   * @returns alert: The match has been added to the schedule: success
   * alert: You can't enter the same team for Team1 and Team2: failure.
   */
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

  submitComment(form: NgForm){

    if(form.value.minuteInput <= 90 && form.value.minuteInput >= 0){
      const sendComment: commentary = {
        matchID: form.value.matchInput,
        commentType: form.value.typeInput,
        comment: form.value.comT,
        minute: form.value.minuteInput,
      };
      this.afs.collection("commentary").add(sendComment).then((result) => {
        console.log("result id: ");
        alert("You have succesfully log the comment!");
      });
      form.reset();
    }
    else{
      alert("Please enter the minute between 0 and 90!");
    }

  }


  DoSmth(){
    //bir sey yapcaz
    this.router.navigate(["chart"]);
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

  fullMinutes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
    80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90]

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
