import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    public authService: AuthService
  )
  {}


  onLogin(form: NgForm){

    console.log("in onLogin");
    if(form.invalid){
      return;
    } else{
      this.authService.SignIn(form.value.emailInput, form.value.passwordInput);

    }





    //maybe password rules: 8 chars, etc. etc.

    form.resetForm();
  }

}
