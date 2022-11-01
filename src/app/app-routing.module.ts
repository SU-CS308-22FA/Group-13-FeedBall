import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './login_signup/login-signup.component';
import { SignupComponent } from './login_signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginSignupComponent},  //login (at each app opening? can be changed later on)
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
