import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor() {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    //this.authService.login(form.value.email, form.value.password);
  }
}
