import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{


  onLogin(form: NgForm){

    console.log("in onLogin");
    if(form.invalid){
      return;
    }


    //maybe password rules: 8 chars, etc. etc.

    form.resetForm();
  }

}
