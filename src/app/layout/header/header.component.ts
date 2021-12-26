import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //--strictNullCkecks
  email : string | null | undefined;

  constructor(
    private auth:AuthService,
    private router:Router,
    private toastr:ToastrService
    ) { 
    auth.getUser().subscribe((user) => {
      this.email = user?.email;
    });
  }

  ngOnInit(): void {
  }


  async handleLogout(){
    try{
      const res = await this.auth.signOut();
      //redirect user to the signin page
      this.router.navigateByUrl('/signin');
      this.toastr.success('Logged out successfuly');
      this.email = null;

    } catch (error) {
      this.toastr.error('Something went wrong');
    }
  }
}
