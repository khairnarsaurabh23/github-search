import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {GithubService} from '../../services/github.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //ts strict null check
  user = {};
  userName!:string;
  error = "";
  repoUrl:string = "";
  //to control the template rendering according to user status
  show:boolean = false;

  constructor(
    private ref:ChangeDetectorRef,
    private githubService:GithubService
    ) { }

  ngOnInit(): void {
  }


  //function to handle search functionality
  findUser(){
    //get user object
    this.githubService.getUserDetails(this.userName).subscribe(
      (user) => {
        this.user = user;
        this.error = "";
        //detect the change in component
        this.ref.detectChanges();
        console.log(this.user);
        this.show = true;
      },
      //in cese user not found
      (err) => {
        this.user = {};
        this.error = "User not found!";
        this.ref.detectChanges();
        this.show = false;
      });
  }

}
