import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }


  //signup method
  signUp(email:string, password:string){
    //using built in mrthos to signUp from firebase
    return this.auth.createUserWithEmailAndPassword(email, password);
  }


  //signin method
  signIn(email:string, password:string){
    //using built in methos from firebase
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  //get the user object returned by firebase
  getUser(){
    //if successfull sign in, firebase return the authState Obj
    //authSate is observable
    return this.auth.authState;
  }

  signOut(){
    return this.auth.signOut();
  }

}
