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
import { isIntersectionTypeNode } from 'typescript';



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

  public filterOption = "all";
  user$ = this.authService.user$;



}

//pipelines
@Pipe({ name: 'todatepipe2' })
export class ToDatePipe2 implements PipeTransform {
  transform(timestamp: any) {

    var numtimestamp = Number(timestamp.seconds);
    numtimestamp = numtimestamp * 1000;
    const dateOf = new Date(numtimestamp);

    var returnString = "";

    returnString = dateOf.getDate().toString() + "." + dateOf.getMonth().toString() + "." +  dateOf.getFullYear().toString();

    return returnString;

  }
}

@Pipe({ name: 'sortteamfirstpipe' })
export class SortTeamFirstPipe implements PipeTransform {
  transform(listUnsorted: News[], teamUser: string) {

    var listSorted: News[] = [];
    var addedIndexes: number[] = [];
    var size = Object.keys(listUnsorted).length;
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
    return listSorted;
  }
}


@Pipe({ name: 'filterteamonlypipe' })
export class FilterTeamOnlyPipe implements PipeTransform {
  transform(listUnfiltered: News[], teamUser: string) {

    var filteredList: News[] = [];
    var size = Object.keys(listUnfiltered).length;

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

    return filteredList;
  }
}

