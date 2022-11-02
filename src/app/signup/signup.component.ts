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


  public passwordMatch = true; //check pass match

  constructor(
    public authService: AuthService
  )
  {}

  onSignUp(form: NgForm){
    console.log("in onSignUp");

    if(form.value.passwordInput1 != form.value.passwordInput2){
      console.log("password does not match. Form will be rejected.");
      this.passwordMatch = false;
    }
    else{
      this.passwordMatch = true;
      console.log("passwords match!");
    }




    if(form.invalid){
      return;
    } else{

      if(this.passwordMatch){ //password match true
        console.log("passwords match, call signup.")
        this.authService.SignUp(form.value.emailInput, form.value.passwordInput1);
      }
      else{
        console.log("reject form, not matching passwords.");
        return;
      }
    }


    //maybe password rules: 8 chars, etc. etc.

    form.resetForm();
  }

}
