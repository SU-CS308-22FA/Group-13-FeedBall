import { Component } from '@angular/core';
import { AuthService } from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(
    public authService: AuthService
  )
  {}
  title = 'feedball_project';
}
