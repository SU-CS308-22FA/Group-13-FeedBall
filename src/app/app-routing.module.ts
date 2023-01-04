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
import { MatchesAdminComponent } from './admin_panel/matches_admin.component';
import { InMatchPreComponent } from './in-match-pre/in-match-pre.component';
import { AdminPollsComponent } from './admin_panel/admin_polls.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { TeamsComponent } from './teams/teams.component';
import { PrizePageComponent } from './prize_page/prize_page.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'feed', component: FeedMainComponent },
  { path: 'profile', component: UserProfileComponent},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'admin-panel', component: AdminPanelComponent},
  { path: 'leaderboard', component: LeaderboardComponent},
  { path: 'in-match/:matchId', component: InMatchComponent},
  { path: 'in-match-pre', component: InMatchPreComponent},
  { path: 'user-detail', component: UserDetailComponent},
  { path: 'news-page', component: NewsPageComponent},
  { path: 'polls-page', component: PollsPageComponent},
  { path: 'chart', component: ChartsComponent},
  { path: 'matches-admin', component: MatchesAdminComponent},
  { path: 'admin-polls', component: AdminPollsComponent},
  { path: 'team-info', component: TeamInfoComponent },
  { path: 'teams/:team', component: TeamsComponent },
  { path: 'prize-page', component: PrizePageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
