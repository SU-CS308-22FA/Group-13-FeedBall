import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NoopAnimationsModule} from '@angular/platform-browser/animations'
import {MatSelectModule} from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FeedMainComponent } from './main_page/feed_main.component';
import { UserProfileComponent } from './profile/user_profile.component';
import { PollsPageComponent } from './polls_page/polls_page.component';
import { SignupComponent } from './signup/signup.component';
import { EditProfileComponent } from './profile/edit_profile.component';
import { AdminPanelComponent } from './admin_panel/admin_panel.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { InMatchComponent } from './in-match/in-match.component';
import { MatchesAdminComponent, ReturnAllMatchPipe } from './admin_panel/matches_admin.component';


import { UserDetailComponent } from './admin_panel/user_detail.component';
import { UidContainsListPipe } from './admin_panel/user_detail.component';
import { NewsPageComponent } from './news_page/news_page.component';
import { ToDatePipe2 } from './news_page/news_page.component';
import { SortDateDescendingPipe } from './news_page/news_page.component';
import { PluralPipe } from './in-match/in-match.component';
import { SortDateDescendingPipeP } from './polls_page/polls_page.component';


import { MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { environment } from "src/environments/environment";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from "./shared/services/auth.service";
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { ToDatePipe } from './profile/edit_profile.component';
import { TransformPipe } from './leaderboard/leaderboard.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ReturnSizePipe } from './leaderboard/leaderboard.component';
import { ReturnXthPipe } from './leaderboard/leaderboard.component';
import { ReturnIfXthPipe } from './leaderboard/leaderboard.component';
import { ReturnRankUserPipe } from './leaderboard/leaderboard.component';
import { SortTeamFirstPipe } from './news_page/news_page.component';
import { FilterTeamOnlyPipe } from './news_page/news_page.component';
import { IsUserInDisikedListPipe } from './news_page/news_page.component';
import { IsUserInLikedListPipe } from './news_page/news_page.component';
import { HoursMinutesPipe } from './in-match/in-match.component';
import { SortByDatePipe } from './in-match/in-match.component';
import { IsUserInLikedListOfMessagePipe } from './in-match/in-match.component';
import { ReturnUserPipe } from './in-match/in-match.component';
import { DisplayMessagesOnlyFromCurrentMatchPipe } from './in-match/in-match.component';
import { ReturnCurrentMatchPipe } from './in-match/in-match.component';
import { ReturnCurrentMatchIdPipe } from './in-match/in-match.component';
import { ReturnFinishedMatchPipe } from './main_page/feed_main.component';
import { DisableInMatchButtonPipe } from './header/header.component';
import { ChartsComponent } from './charts/charts.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { InMatchPreComponent } from './in-match-pre/in-match-pre.component';
import { ReturnCurrentMatchesListPipe } from './in-match-pre/in-match-pre.component';
import { IsThereAnyCurrentMatchPipe } from './in-match-pre/in-match-pre.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FeedMainComponent,
    UserProfileComponent,
    SignupComponent,
    EditProfileComponent,
    ToDatePipe,
    UidContainsListPipe,
    AdminPanelComponent,
    LeaderboardComponent,
    InMatchComponent,
    UserDetailComponent,
    MatchesAdminComponent,
    TransformPipe,
    ReturnSizePipe,
    ReturnXthPipe,
    ReturnIfXthPipe,
    ReturnRankUserPipe,
    NewsPageComponent,
    ToDatePipe2,
    SortTeamFirstPipe,
    FilterTeamOnlyPipe,
    SortDateDescendingPipe,
    SortDateDescendingPipeP,
    IsUserInDisikedListPipe,
    IsUserInLikedListPipe,
    HoursMinutesPipe,
    PollsPageComponent,
    SortByDatePipe,
    PluralPipe,
    IsUserInLikedListOfMessagePipe,
    ReturnUserPipe,
    DisplayMessagesOnlyFromCurrentMatchPipe,
    ReturnCurrentMatchPipe,
    ReturnFinishedMatchPipe,
    ReturnAllMatchPipe,
    ReturnCurrentMatchIdPipe,
    ChartsComponent,
    DisableInMatchButtonPipe,
    InMatchPreComponent,
    ReturnCurrentMatchesListPipe,
    IsThereAnyCurrentMatchPipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    ScrollingModule,
    MatCheckboxModule


  ],
  providers: [AuthService, LeaderboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
