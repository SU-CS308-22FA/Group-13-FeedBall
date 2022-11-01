import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['login-signup.component.css']
})

export class LoginSignupComponent{

  constructor(){}



  //pipeline or function for email check [a-zA-Z]+@[a-z]



  onLogin(form: NgForm){

    console.log("in onLogin");
    if(form.invalid){
      return;
    }




    form.resetForm();
  }


}
