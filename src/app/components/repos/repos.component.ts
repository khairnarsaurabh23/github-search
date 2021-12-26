import { 
  Component, 
  OnInit, 
  Input,
  OnChanges,   //life cycle hook
  ChangeDetectorRef //Base class that provides change detection functionality.
} from '@angular/core';
import {GithubService} from '../../services/github.service';


@Component({
  selector: 'user-repositories-list',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit, OnChanges {

  //get userName as input from parent component
  @Input() userName!:string;
  repos!:{};
  //to store the names of repo's from repos object.
  names:string[] = ['', '', '', '', '', '', '', '', '', ''];
  //to loop through repos object
  i:number = 0;

  constructor(
    private githubService:GithubService,
    private ref:ChangeDetectorRef,
    ) { }

  ngOnInit(): void {
  }

  //get the name of repo's and store it in an array
  dataTrans(){
    //loop till last or 10th repo.
    while(this.repos[this.i]){
        this.names[this.i] = this.repos[this.i].name;
        //increament i to get next repo
        this.i = this.i + 1;
    }
  }

  //OnChanges --> A lifecycle hook that is called when any data-bound property of a directive changes.
  // Define an ngOnChanges() method to handle the changes.
  ngOnChanges():void{
    if(this.userName){
      console.log(this.userName);
      this.githubService.getRepos(this.userName).subscribe(
        //getRepos is returning an object
        (repos:{}) => {
          //getRepos return an observable objects
          this.repos = repos;
          this.ref.detectChanges();
          this.dataTrans();
        },
        (error) => {
          console.log(error);
        });
    } 
  }
}
