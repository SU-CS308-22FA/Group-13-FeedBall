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
    private auth: AngularFireAuth) {
      this.newsRef = this.afs.collection('News');
      this.news$ = this.newsRef.valueChanges();
      console.log(this.newsRef);
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

    returnString = dateOf.getDate().toString() + "." + dateOf.getMonth().toString() + "." +  dateOf.getFullYear().toString();

    return returnString;

  }
}
