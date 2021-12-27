import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import all pages componets
import {PageNotFoundComponent} from './page/page-not-found/page-not-found.component';
import {HomeComponent} from './page/home/home.component';
import {SigninComponent} from './page/signin/signin.component';
import {SignupComponent} from './page/signup/signup.component';

//AngularFireAuthGuard --> protect the routes
//docs:https://github.com/angular/angularfire/blob/master/docs/auth/router-guards.md
import { 
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/compat/auth-guard';

//redirection callbacks / authGuardPipes
//changed routing for heroku
const redirectUnauthorizedToSignIn = () => redirectUnauthorizedTo(['signin']);
const redirectSignedIn = () => redirectLoggedInTo(['']);

const routes: Routes = [
  //signin route
  { 
    path: 'signin', 
    component: SigninComponent,
    canActivate: [AngularFireAuthGuard], 
    //if authorized redirect to the home page
    data: { authGuardPipe: redirectSignedIn }
  },
  //signup route
  {
    path: 'signup',
    component: SignupComponent
  },
  //home route
  {
    path:  '',
    component: HomeComponent,
    //canActivate: [AngularFireAuthGuard], 
    //if user is not authorized redirect t to the signin
    //data: { authGuardPipe: redirectUnauthorizedToSignIn }
  },
  //404 Page not found
  //`**` means 'rest of all'
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
