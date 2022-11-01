import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{
  onSignUp(form: NgForm){
    console.log("in onSignUp");
    if(form.invalid){
      return;
    }


    //maybe password rules: 8 chars, etc. etc.

    form.resetForm();
  }

}
