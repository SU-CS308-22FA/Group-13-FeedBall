import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './feed_main.component.html',
  styleUrls: ['./feed_main.component.css']
})
export class FeedMainComponent{

  constructor(private router: Router){}

  navigateProfilePage(){
    this.router.navigate(['/profile']);
  }


  callLogOut(){
    console.log("logout will be called, in callLogOut.");
  }
}
