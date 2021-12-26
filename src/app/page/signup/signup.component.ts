import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from './../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private router:Router,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
  }

  //handle the NGForm submission
  onSubmit(f:NgForm){
    const {email, password} = f.form.value;
    this.auth.signUp(email, password)
    .then((res) => {
      //redirect user to the home 
      //page after succeessful registration
      this.router.navigateByUrl('/');
      this.toastr.success('Registered Succeessfuly!');
    })
    .catch((err) => {
      //handle the error part
      console.log(err.message);
      this.toastr.error(`${err.message}`);
    })
  }

}
