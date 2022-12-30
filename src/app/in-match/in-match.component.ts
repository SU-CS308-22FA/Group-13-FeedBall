import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
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
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { messages } from '../models/messages.model';
import { UserDetailComponent } from '../admin_panel/user_detail.component';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { matches } from '../models/matches.model';
import { InMatchPolls } from '../models/inmatchpolls.model';

@Component({
  selector: 'app-in-match',
  templateUrl: './in-match.component.html',
  styleUrls: ['./in-match.component.css']
})
export class InMatchComponent implements OnInit, OnDestroy{


  messagesRef: AngularFirestoreCollection<messages>;
  messages$: Observable<messages[]>;

  inMatchPollsRef: AngularFirestoreCollection<InMatchPolls>;
  inMatchPolls$: Observable<InMatchPolls[]>;

  usersRef: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;

  matchesRef: AngularFirestoreCollection<matches>;
  matches$: Observable<matches[]>;

  public matchId: any;
  public isChecked: boolean = false;
  public isCheckedPoll: boolean = false;
  public enteredTime: Date;

  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router,
    public route: ActivatedRoute
  ){
    this.enteredTime = new Date();

    this.messagesRef = this.afs.collection('messages');
    this.messages$ = this.messagesRef.valueChanges();

    this.inMatchPollsRef = this.afs.collection('InMatchPolls');
    this.inMatchPolls$ = this.inMatchPollsRef.valueChanges();

    //get matches list, apply async on frontend, then a pipeline to match a match time to current time, when found, dummyMathch will be assigned accordingly maybe with a function.

    this.usersRef = this.afs.collection('users');
    this.users$ = this.usersRef.valueChanges();

    this.matchesRef = this.afs.collection('matches');
    this.matches$ = this.matchesRef.valueChanges();

    //this.ngOnInit();
  }

  ngOnInit(){


    this.route.paramMap.subscribe((paramMap: ParamMap) => {  //paramMap: observable that can subscribe
      if(paramMap.has('matchId')){

        this.matchId = paramMap.get('matchId');
        console.log("passed match id:", this.matchId);

      }
      else{
        //what should happen here?
        //show error and have a button to renaviagte to main
      }
    });



  }

  ngOnDestroy(){

  }


  user$ = this.authService.user$;

  onSubmitForm(form: NgForm, user: User, currentMatchString: string){

    if(form.valid && form.value.content != ""){
      var message = form.value.content;
      const now = new Date();
      this.createMessageAndPushToDatabase(message, now, user, currentMatchString);
    }
    else{
      return;
    }

    form.resetForm();
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

  isListEmpty(mesglist: messages[]){
    var size = Object.keys(mesglist).length;

    return size == 0;

  }

  isListEmptyPoll(implist: InMatchPolls[], user: User){ //empty means being empty for polls that are not answered
    var size = Object.keys(implist).length;

    if(size == 0){
      return true;
    }
    else{
      for(let i=0; i<size; i++){
        if(!this.hasTheUserAnsweredThisPoll(user, implist[i])){
          return false;
        }
      }
      return true;
    }

  }


  ReturnUser(uidUser: string, userList: Array<User>){

    var size = Object.keys(userList).length;
    if(size>0){
      for(let i=0; i<size; i++){
        if(userList[i].uid == uidUser){
          return userList[i];
        }
      }
    }
    var now = new Date();
    const nullUser: User = {
      uid: "",
      email: "",
      displayName: "",
      photoURL: "",
      emailVerified: false,
      name: "",
      surname: "",
      gender: "",
      age: now,
      point: 0,
      team: "",
      isAdmin: false,
      isBanned: false
    };
    return nullUser;
  }

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

  /**
   * This function is called when user clicks the thumbs up button in order to like a message
   * To increment the liking user's points by 5 by calling incrementPoints from authService, giving the first parameter as userLiking
   * To increment the point of the user who is the one sent that message by 5 by calling incrementPoints from authService, giving the first parameters as userMessageOwner
   * It also takes likeList of that message containing uids of users who liked this message, and appends liking user's uid to this list.
   * It also takes that message's like count and adds 1
   * Then it calls LikeUnlikeMessage function from authService with the paremeters of msg, new like count, new list containing uids and mid (message id) pf msg
   * @param msg Message which is being liked
   * @param userLiking User object of the user liking the messgae
   * @param userMessageOwner User object of the user who wrote the message
   * @returns
   */
  likeMessage(msg: messages, userLiking: User, userMessageOwner: User){

    if(!this.isUserInList(msg.likeList, userLiking)){

      this.authService.incrementPoints(userLiking, 5);
      this.authService.incrementPoints(userMessageOwner, 15);


      var newList: Array<String> = msg.likeList;
      newList.push(userLiking.uid);
      var newLikeNum: number = msg.likeNumber + 1;

      this.authService.LikeUnlikeMessage(msg, newLikeNum, newList, msg.mid);
    }
    else{
      return;
    }
    //increment like
    //increment liking user's point
    //increment message owner's point
  }

  unlikeMessage(msg: messages, userUnliking: User, userMessageOwner: User){

    if(this.isUserInList(msg.likeList, userUnliking)){

      this.authService.decrementPoints(userUnliking, 5);
      this.authService.decrementPoints(userMessageOwner, 15);


      var newList = this.returnListWithout(msg.likeList, userUnliking.uid);
      var newLikeNum: number = msg.likeNumber - 1;

      this.authService.LikeUnlikeMessage(msg, newLikeNum, newList, msg.mid);
    }
    else{
      return;
    }
    //decrement like
    //decrement liking user's point
    //decrement message owner's point

  }

  selectOption(userNow: User, selection: number, imp: InMatchPolls){

    this.authService.incrementPoints(userNow, 5);

    var opt1Count:number = imp.option1Count;
    var opt2Count:number = imp.option2Count;
    var opt3Count:number = imp.option3Count;
    var opt1List:Array<String> = imp.option1UserList;
    var opt2List:Array<String> = imp.option2UserList;
    var opt3List:Array<String> = imp.option3UserList;


    if(selection == 1){
      opt1Count = opt1Count + 1;
      opt1List.push(userNow.uid);
    }
    else if(selection == 2){
      opt2Count = opt2Count + 1;
      opt2List.push(userNow.uid);
    }
    else{//selection == 3
      opt3Count = opt3Count + 1;
      opt3List.push(userNow.uid);
    }
    console.log("checkbox clicked");



    var impidGiven: string = imp.impid;
    const newRef: AngularFirestoreDocument<any> = this.afs.doc(`InMatchPolls/${impidGiven}`);


    const theNewImp: InMatchPolls = {
      impid: imp.impid,
      writtenBy: imp.writtenBy,
      dateWritten: imp.dateWritten,
      matchId: imp.matchId,
      pollText: imp.pollText,
      option1: imp.option1,
      option2: imp.option2,
      option3:imp.option3,
      option1Count: opt1Count,
      option2Count: opt2Count,
      option3Count: opt3Count,
      option1UserList: opt1List,
      option2UserList: opt2List,
      option3UserList: opt3List
    }


    return newRef.set(theNewImp, { merge: true });

  }

  hasTheUserAnsweredThisPoll(thisUser: User, impoll: InMatchPolls){

    for(let i=0; i<impoll.option1Count; i++){
      if(thisUser.uid == impoll.option1UserList[i]){
        return true;
      }
    }
    for(let i=0; i<impoll.option2Count; i++){
      if(thisUser.uid == impoll.option2UserList[i]){
        return true;
      }
    }
    for(let i=0; i<impoll.option3Count; i++){
      if(thisUser.uid == impoll.option3UserList[i]){
        return true;
      }
    }
    return false;

  }

  whichOptionSelected(user: User, impoll: InMatchPolls){
    for(let i=0; i<impoll.option1Count; i++){
      if(user.uid == impoll.option1UserList[i]){
        return "1";
      }
    }
    for(let i=0; i<impoll.option2Count; i++){
      if(user.uid == impoll.option2UserList[i]){
        return "2";
      }
    }
    for(let i=0; i<impoll.option3Count; i++){
      if(user.uid == impoll.option3UserList[i]){
        return "3";
      }
    }

    console.log("something went wrong");
    return "";
  }

  /**
   * This functions is created to make sure the match ends within 90 minutes.
   * Since we only get the hour, minute and date, it is up to this function to calculate the amount time during which the match is active.
   * @param date This is the date that we will start with, including the hours and minutes
   * @param minutes Minutes according to which we want to push the time by.
   * @returns The function returns the new date, with (number) minutes added to it.
   */
  addMinutes(date:Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  navigateMainPage(){
    this.router.navigate(['feed']);
  }


  /**
   * This function is called in onSubmitForm after user presses Eter or clicks the send button.
   * It creates a messages object to be pushed to the database, assigns matchCode as currentMatchCode, sentWhen as messageDate, mid empty, like count as 0,
   * likeList as empty list, content as messageContent, message owner's id, name, surname from User object.
   * Then it adds this object to the Firebase database and keeps the auto assigned unique document id as a variable.
   * Then it calls SetMessageId to assign this unique document id as a field to use it later on during like or unlike operations.
   *
   * @param messageContent Content of the message taken as an input from the user
   * @param messageDate Date object regarding when the button is clicked or Enter pressed to send the message
   * @param user Usser object of the user sending the message
   * @param currentMatchCode mid (match id) of the current match going on
   */
  createMessageAndPushToDatabase(messageContent: string, messageDate: Date, user: User, currentMatchCode: string){

    let emptyList: Array<String> = [];
    let id = "";

    const sendMessage: messages = {
      mid: "",
      matchCode: currentMatchCode,
      messageOwnerID: user.uid,
      messageOwnerName: user.name,
      messageOwnerSurname: user.surname,
      sentWhen: messageDate,
      content: messageContent,
      likeNumber: 0,
      likeList: emptyList,

    }

    this.afs.collection("messages").add(sendMessage).then((result) => {

      id = result.id;
      console.log("result id: ", result.id, "\n");

      this.authService.SetMessageId(sendMessage, id).then((result2) => {

        console.log("id setted succesfully\n");

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

    this.authService.incrementPoints(user, 10);


  }

}



@Pipe({ name: 'hoursminutespipe'})
export class HoursMinutesPipe implements PipeTransform {
transform(timestamp: any) {

  var numtimestamp = Number(timestamp.seconds);
  numtimestamp = numtimestamp * 1000;
  const dateOf = new Date(numtimestamp);
  var returnStr = "";

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


  returnStr = hours + ":" + mins;


  return returnStr;
  }
}


@Pipe({ name: 'sortbydatepipe'})
export class SortByDatePipe implements PipeTransform {
  transform(listNotSorted: messages[]) {

    var sortedList: messages[] = [];

    if(listNotSorted != null){
      sortedList = listNotSorted.sort((a, b) => (a.sentWhen < b.sentWhen ? -1 : 1));
    }

    return sortedList;

  }
}

@Pipe({ name: 'sortbydatepollpipe'})
export class SortByDatePollPipe implements PipeTransform {
  transform(listNotSorted: InMatchPolls[]) {

    var sortedList: InMatchPolls[] = [];

    if(listNotSorted != null){
      sortedList = listNotSorted.sort((a, b) => (a.dateWritten < b.dateWritten ? -1 : 1));
    }

    return sortedList;

  }
}

@Pipe({ name: 'pluralpipe'})
export class PluralPipe implements PipeTransform {
  transform(count: number) {

    if (count == 1){
      return "";
    }
    else{
      return "s";
    }

  }
}


@Pipe({ name: 'isuserinlikedlistofmessagepipe' })
export class IsUserInLikedListOfMessagePipe implements PipeTransform {
  transform(msg: messages, user: User) {

    var size = Object.keys(msg.likeList).length;
    if(size>0){
      for(let i=0; i<size; i++){
        if(msg.likeList[i] == user.uid){
          return true;
        }
      }
      return false;
    }
    else{
      return false;
    }

  }
}

@Pipe({ name: 'returnuserpipe' })
export class ReturnUserPipe implements PipeTransform {
transform(uidUser: string, userList: Array<User>) {

  var size = Object.keys(userList).length;
  if(size>0){
    for(let i=0; i<size; i++){
      if(userList[i].uid == uidUser){
        return userList[i];
      }
    }
  }
  return null;

  }
}

@Pipe({ name: 'displaymessagesonlyformcurrentmatchipe' })
export class DisplayMessagesOnlyFromCurrentMatchPipe implements PipeTransform {
transform(mesgList: messages[], currentMatchString: string) {

  var returnList: messages[] = [];
  var size = Object.keys(mesgList).length;

  for(let i=0; i<size; i++){
    if(mesgList[i].matchCode == currentMatchString){
      returnList.push(mesgList[i]);
    }
  }

  return returnList;
  }
}

@Pipe({ name: 'displaypollsonlyformcurrentmatchipe' })
export class DisplayPollsOnlyFromCurrentMatchPipe implements PipeTransform {
transform(pollList: InMatchPolls[], currentMatchString: string) {

  var returnList: InMatchPolls[] = [];
  var size = Object.keys(pollList).length;

  for(let i=0; i<size; i++){
    if(pollList[i].matchId == currentMatchString){
      returnList.push(pollList[i]);
    }
  }

  return returnList;
  }
}

@Pipe({ name: 'displaymessagesonlyformcurrentmatchnonpreviouspipe' })
export class DisplayMessagesOnlyFromCurrentMatchNonPreviousPipe implements PipeTransform {
transform(mesgList: messages[], currentMatchString: string, entered: Date) {

  var returnList: messages[] = [];
  var size = Object.keys(mesgList).length;

  for(let i=0; i<size; i++){


    var star:any = mesgList[i].sentWhen;
    var numtimestamp = Number(star.seconds);
    numtimestamp = numtimestamp * 1000;
    const dateOf = new Date(numtimestamp);

    if(mesgList[i].matchCode == currentMatchString && dateOf >= entered){
      returnList.push(mesgList[i]);
    }
  }

  return returnList;
  }
}

@Pipe({ name: 'returncurrentmatchipe' })
export class ReturnCurrentMatchPipe implements PipeTransform {
transform(matchesList: matches[], passedId: string) {

  var retStr: string = "";

  var size = Object.keys(matchesList).length;

  /**
   * This functions is created to make sure the match ends within 90 minutes.
   * Since we only get the hour, minute and date, it is up to this function to calculate the amount time during which the match is active.
   * @param Date This is the date that we will start with, including the hours and minutes
   * @param number Minutes according to which we want to push the time by.
   * @returns date This is the new date, with (number) minutes added to it.
   */
  function addMinutes(date:Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

    for(let i=0; i<size; i++){
      var star:any = matchesList[i].starts_at;
      var numtimestamp = Number(star.seconds);
      numtimestamp = numtimestamp * 1000;
      const dateOf = new Date(numtimestamp);
      console.log(dateOf);
      const dateOf2 = dateOf;
      var ends_at = addMinutes(dateOf2,90);
      console.log(ends_at);
      const anlik = new Date();
      const dateOf3 = new Date(numtimestamp);
      if (anlik >= dateOf3 && anlik <= ends_at && passedId == matchesList[i].matchID){
        retStr = matchesList[i].team1.toString() + "-" + matchesList[i].team2.toString() + "\r\n" +
        matchesList[i].score_team1.toString() + " - " + matchesList[i].score_team2.toString();

        return retStr;
      }
    }
    return retStr;
    //search by date among matches list, return the match code

  }


}

@Pipe({ name: 'returncurrentmatchidipe' })
export class ReturnCurrentMatchIdPipe implements PipeTransform {
transform(matchesList: matches[], passedId: string) {

  var retStr: string = "null";

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

      if (anlik >= dateOf3 && anlik <= ends_at && passedId == matchesList[i].matchID){
        retStr = matchesList[i].matchID;
        console.log("cureent match id: ", retStr);
        return retStr;
      }
    }
    return retStr;
    //search by date among matches list, return the match code
  }
}


@Pipe({ name: 'displaypercentpipe' })
export class DisplayPercentPipe implements PipeTransform {
transform(optionNo: number, imp:InMatchPolls) {

  var numerator: number;
  if(optionNo == 1){
    numerator = imp.option1Count;
  }
  else if(optionNo == 2){
    numerator = imp.option2Count;
  }
  else{
    numerator = imp.option3Count;
  }
  var percent = numerator / (imp.option1Count + imp.option2Count + imp.option3Count);

  percent = percent * 100;

  return percent.toString() + "%";

  }
}


@Pipe({name: 'impollsuserhasanswered'})
export class ImpollsUserHasAnswered implements PipeTransform {
transform(impollsList: InMatchPolls[], thisUser: User){

  var answeredList: InMatchPolls[] = []

  var size = Object.keys(impollsList).length;

  for(let i=0; i<size; i++){
    var found = false;
    var impoll: InMatchPolls = impollsList[i];

    for(let i=0; i<impoll.option1Count; i++){
      if(thisUser.uid == impoll.option1UserList[i]){
        answeredList.push(impoll);
        var found = true;

      }
    }
    if(!found){
      for(let i=0; i<impoll.option2Count; i++){
        if(thisUser.uid == impoll.option2UserList[i]){
          answeredList.push(impoll);
          var found = true;

        }
      }
    }
    if(!found){
      for(let i=0; i<impoll.option3Count; i++){
        if(thisUser.uid == impoll.option3UserList[i]){
          answeredList.push(impoll);
          var found = true;
        }
      }
    }
  }

  return answeredList;


}
}

@Pipe({name: 'impollsuserhasnotanswered'})
export class ImpollsUserHasNotAnswered implements PipeTransform {
transform(impollsList: InMatchPolls[], thisUser: User){

  var unansweredList: InMatchPolls[] = []

  var size = Object.keys(impollsList).length;

  for(let i=0; i<size; i++){
    var found = false;
    var impoll: InMatchPolls = impollsList[i];

    for(let i=0; i<impoll.option1Count; i++){
      if(thisUser.uid == impoll.option1UserList[i]){
        var found = true;

      }
    }
    if(!found){
      for(let i=0; i<impoll.option2Count; i++){

        if(thisUser.uid == impoll.option2UserList[i]){
          var found = true;

        }
      }
    }
    if(!found){
      for(let i=0; i<impoll.option3Count; i++){
        if(thisUser.uid == impoll.option3UserList[i]){
          var found = true;
        }
      }
    }

    if(!found){
      unansweredList.push(impollsList[i]);
    }
  }

  return unansweredList;


}
}



