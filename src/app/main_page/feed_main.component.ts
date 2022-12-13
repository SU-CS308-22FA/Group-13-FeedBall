import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './feed_main.component.html',
  styleUrls: ['./feed_main.component.css']
})
export class FeedMainComponent{

  user$ = this.authService.user$;
  constructor(private router: Router,
    private authService: AuthService){}

  navigateProfilePage(){
    this.router.navigate(['profile']);
  }

  navigateNewsPage(){
    this.router.navigate(['news-page']);
  }
  callLogOut(){
    this.authService.SignOut();
  }

  navigatePollsPage(){
    this.router.navigate(['polls-page']);
  }

}
