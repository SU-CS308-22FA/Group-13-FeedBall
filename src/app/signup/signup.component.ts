import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { getAdditionalUserInfo, updateCurrentUser } from 'firebase/auth';
import { UserProfileComponent } from '../profile/user_profile.component';
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/services/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{
  userData:any;
  //User: any;
  user: any;

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


  public passwordMatch = true; //check pass match

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
  )
  {}

  onSignUp(form: NgForm){
    console.log("in onSignUp");

    if(form.value.passwordInput1 != form.value.passwordInput2){
      this.passwordMatch = false;
    }
    else{
      this.passwordMatch = true;
    }

    if(form.invalid){
      return;
    } else{

      if(this.passwordMatch){ //password match true

        this.authService.SignUp(form.value.emailInput, form.value.passwordInput1, form.value.nameInput, form.value.surnameInput, form.value.genderInput, form.value.birthday, 0, form.value.teamInput, form.value.passwordInput1);

      }
      else{
        return;
      }
    }


    //maybe password rules: 8 chars, etc. etc.

    form.resetForm();
  }

}
