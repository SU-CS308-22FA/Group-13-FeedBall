import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FeedMainComponent } from './main_page/feed_main.component';
import { UserProfileComponent } from './profile/user_profile.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'feed', component: FeedMainComponent },
  { path: 'profile', component: UserProfileComponent},//:username shoudl be added at the end, since each user profile will be unique
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
