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
  selector: 'app-polls',
  templateUrl: './polls_page.component.html',
  styleUrls: ['./polls_page.component.css']
})
export class PollsPageComponent{
  
}