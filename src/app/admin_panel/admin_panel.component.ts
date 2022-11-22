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
    const today = new Date();
    let tags: Array<string> = ['Konyaspor'];
    this.afs.collection("News").add({header: form.value.headerInput, content: form.value.contentInput, newsdate: today, writtenby: name, tags: tags})
    .then(() => {
      alert("The new has been added to the news page.")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
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






}
