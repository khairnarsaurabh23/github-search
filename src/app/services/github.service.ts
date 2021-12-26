import { Injectable } from '@angular/core';
//HttpClient is a class from HttpClientModule 
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http:HttpClient) { }

  //to find the user on github
  getUserDetails(userName:string){
    //get method makes the web request the http
    //return observable
    return this.http.get(`https://api.github.com/users/${userName}`);
  }

  // //get the repositories of the user
  // getUserRepos(userName:string){
  //   return `https://api.github.com/users/${userName}/repos`;
  // }

  //get the repos of the user
  getRepos(userName:string){
    return this.http.get(`https://api.github.com/users/${userName}/repos`);
  }

}
