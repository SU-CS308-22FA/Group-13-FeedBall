import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{


  constructor(
    public authService: AuthService
  )
  {}

  onSignUp(form: NgForm){
    console.log("in onSignUp");
    if(form.invalid){
      return;
    } else{
      this.authService.SignUp(form.value.emailInput, form.value.passwordInput1);
    }


    //maybe password rules: 8 chars, etc. etc.

    form.resetForm();
  }

}
