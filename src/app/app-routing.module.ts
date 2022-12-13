import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FeedMainComponent } from './main_page/feed_main.component';
import { UserProfileComponent } from './profile/user_profile.component';
import { SignupComponent } from './signup/signup.component';
import { EditProfileComponent } from './profile/edit_profile.component';
import { AdminPanelComponent } from './admin_panel/admin_panel.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { InMatchComponent } from './in-match/in-match.component';
import { UserDetailComponent } from './admin_panel/user_detail.component';
import { NewsPageComponent } from './news_page/news_page.component';
import { PollsPageComponent } from './polls_page/polls_page.component';
import { ChartsComponent } from './charts/charts.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'feed', component: FeedMainComponent },
  { path: 'profile', component: UserProfileComponent},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'admin-panel', component: AdminPanelComponent},
  { path: 'leaderboard', component: LeaderboardComponent},
  { path: 'in-match', component: InMatchComponent},
  { path: 'user-detail', component: UserDetailComponent},
  { path: 'news-page', component: NewsPageComponent},
  { path: 'polls-page', component: PollsPageComponent},
  { path: 'chart', component: ChartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
