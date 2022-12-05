import { Component } from '@angular/core';
import {News} from "src/app/models/news.model"
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { animationFrameScheduler, of, switchMap, Observable } from 'rxjs';
import { Auth, getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { isIntersectionTypeNode, sortAndDeduplicateDiagnostics } from 'typescript';



@Component({
  selector: 'app-news',
  templateUrl: './news_page.component.html',
  styleUrls: ['./news_page.component.css']
})
export class NewsPageComponent{
  newsRef: AngularFirestoreCollection<News>;
  news$: Observable<News[]>;




  constructor(public authService: AuthService,
    private router: Router,
    private afs: AngularFirestore,
    private auth: AngularFireAuth)
  {
    this.newsRef = this.afs.collection('News');
    this.news$ = this.newsRef.valueChanges();
    console.log(this.newsRef);
  }

  public filterOption = "alldatedesc";
  user$ = this.authService.user$;




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

  like(user: User, news: News){
    console.log("in like");
    if(!this.isUserInList(news.likedUsers, user) && !this.isUserInList(news.dislikedUsers, user)){ //if the user did not like the post and did not dislike the post

      //call necessary increment and add functions
      this.authService.incrementPoints(user, 5); //like: 5 points increment for the user

      //
      var newList: Array<String> = news.likedUsers;
      newList.push(user.uid);
      var newLikeNum: number = news.likes + 1;

      this.authService.LikeDislikePost(news, newLikeNum, news.dislikes, newList, news.dislikedUsers, news.nid);

    }
    else{ //if user disliked the post, it cannot like the post at the same time, should undislike first
      return;
    }
  }

  unlike(user: User, news: News){
    console.log("in unlike");

    if(this.isUserInList(news.likedUsers, user)){

      //call necessary decrement and remove functions
      this.authService.decrementPoints(user, 5);

      //
      var newList = this.returnListWithout(news.likedUsers, user.uid);
      var newLikeNum = news.likes - 1;

      this.authService.LikeDislikePost(news, newLikeNum, news.dislikes, newList, news.dislikedUsers, news.nid);

    }
    else{ //should not be in this state
      return;
    }
  }

  dislike(user: User, news: News){
    console.log("in like");
    if(!this.isUserInList(news.dislikedUsers, user) && !this.isUserInList(news.likedUsers, user)){ //if the user did not like the post and did not dislike the post

      //call necessary increment and add functions
      this.authService.incrementPoints(user, 5);//dislike: 5 points increment for the user

      //
      var newList: Array<String> = news.dislikedUsers;
      newList.push(user.uid);
      var newDislikeNum: number = news.dislikes + 1;

      this.authService.LikeDislikePost(news, news.likes, newDislikeNum, news.likedUsers, newList, news.nid);


    }
    else{ //if user liked the post, it cannot dislike the post at the same time, should unlike first
      return;
    }
  }

  undislike(user: User, news: News){
    console.log("in unlike");

    if(this.isUserInList(news.dislikedUsers, user)){

      //call necessary decrement and remove functions
      this.authService.decrementPoints(user, 5);

      //
      var newList = this.returnListWithout(news.dislikedUsers, user.uid);
      var newDislikeNum = news.dislikes - 1;

      this.authService.LikeDislikePost(news, news.likes, newDislikeNum, news.likedUsers, newList, news.nid);

    }
    else{ //should not be in this state
      return;
    }
  }


}

//pipelines
@Pipe({ name: 'todatepipe2' })
export class ToDatePipe2 implements PipeTransform {
  transform(timestamp: any) {

    var numtimestamp = Number(timestamp.seconds);
    numtimestamp = numtimestamp * 1000;
    const dateOf = new Date(numtimestamp);

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

@Pipe({ name: 'sortteamfirstpipe' })
export class SortTeamFirstPipe implements PipeTransform {
  transform(listUnsorted: News[], teamUser: string) {

    var listSorted: News[] = [];
    var addedIndexes: number[] = [];
    var size = Object.keys(listUnsorted).length;
    if(listUnsorted != null && size > 0){
      for(let i=0; i<size; i++){

        var stringList = listUnsorted[i].tags;
        var boolOf = false;
        var sizeList = Object.keys(stringList).length;
        for(let j=0; j<sizeList; j++){

          if(stringList[j] == teamUser){
            boolOf = true;

          }
        }
        if(boolOf){
          listSorted.push(listUnsorted[i]);
          addedIndexes.push(i);
        }
        boolOf = false;
      }

      var sizeIndexList = Object.keys(addedIndexes).length;
      for(let k=0; k<size; k++){

        var isAdded = false;

        for(let l=0; l<sizeIndexList; l++){
          if(k == addedIndexes[l]){
            isAdded = true;
          }
        }

        if(!isAdded){
          listSorted.push(listUnsorted[k]);
        }
      }
    }
    return listSorted;
  }
}


@Pipe({ name: 'filterteamonlypipe' })
export class FilterTeamOnlyPipe implements PipeTransform {
  transform(listUnfiltered: News[], teamUser: string) {

    var filteredList: News[] = [];
    var size = Object.keys(listUnfiltered).length;

    if(listUnfiltered != null && size > 0){
      for(let i=0; i<size; i++){

        var strList = listUnfiltered[i].tags;
        var sizeStrList = Object.keys(strList).length;
        var isTeamInTag = false;
        for(let j=0; j<sizeStrList; j++){
          if(teamUser == strList[j]){
            isTeamInTag = true;
          }
        }

        if(isTeamInTag){
          filteredList.push(listUnfiltered[i]);
        }
      }
    }

    return filteredList;
  }
}

@Pipe({ name: 'sortdatedescendingpipe' })
export class SortDateDescendingPipe implements PipeTransform {
  transform(listUnfiltered: News[]) {

    var sortedList: News[] = [];

    if(listUnfiltered != null){
      sortedList = listUnfiltered.sort((a, b) => (a.newsdate > b.newsdate ? -1 : 1));
    }

    return sortedList;
  }
}

@Pipe({ name: 'isuserinlikedlistpipe' })
export class IsUserInLikedListPipe implements PipeTransform {
  transform(news: News, user: User) {

    var size = Object.keys(news.likedUsers).length;
    if(size>0){
      for(let i=0; i<size; i++){
        if(news.likedUsers[i] == user.uid){
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

@Pipe({ name: 'isuserindislikedlistpipe' })
export class IsUserInDisikedListPipe implements PipeTransform {
  transform(news: News, user: User) {

    var size = Object.keys(news.dislikedUsers).length;
    if(size>0){
      for(let i=0; i<size; i++){
        if(news.dislikedUsers[i] == user.uid){
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


