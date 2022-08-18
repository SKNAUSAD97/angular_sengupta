import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from "@angular/router";

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public firstRandomNumber:number = 0;
  public secondRandomNumber:number = 0;
  public correctAnswer:number = 0;
  public usersAnswer:number = 0;
  public validation:boolean = true;
  public response:any = '';
  user: SocialUser;
  loggedIn: boolean;

  constructor(private UserService : UserService, private Router:Router, private authService: SocialAuthService) { }

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    this.firstRandomNumber = Math.floor((Math.random() * 10) + 1);
    this.secondRandomNumber = Math.floor((Math.random() * 11) + 1);
    this.correctAnswer = this.firstRandomNumber + this.secondRandomNumber;
  }

  login = (formValue:any) =>{
    if(this.validation){
      this.UserService.userLogin(formValue).subscribe((success)=>{
        this.response = success;
        if(this.response.code == 200){
          localStorage.setItem('user', JSON.stringify(this.response.data));
          Swal.fire('Login Successfull!');
          this.Router.navigate(['e-learning-course'])
          .then(() => {
            window.location.reload();
          });
        }else{
          Swal.fire({
            icon: 'error',
            text: 'User ID or Password not matched...'
          })
        }
      }); 
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(()=>{
      if(this.loggedIn){
        var user_data = {
          name : this.user.name,
          email : this.user.email,
        };
        this.UserService.loginWithGmail(user_data).subscribe((success:any)=>{
          this.response = success;
          if(this.response.code == 200){
            localStorage.setItem('user', JSON.stringify(this.response.data));
            Swal.fire('Login Successfull!');
            this.Router.navigate(['e-learning-course'])
            .then(() => {
              window.location.reload();
            });
          }else{
            Swal.fire({
              icon: 'error',
              text: 'Error while logging in'
            })
          }
        }); 
      }
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(()=>{
      if(this.loggedIn){
        var user_data = {
          name : this.user.name,
          email : this.user.email,
        };
        this.UserService.loginWithGmail(user_data).subscribe((success:any)=>{
          this.response = success;
          if(this.response.code == 200){
            localStorage.setItem('user', JSON.stringify(this.response.data));
            Swal.fire('Login Successfull!');
            this.Router.navigate(['e-learning-course'])
            .then(() => {
              window.location.reload();
            });
          }else{
            Swal.fire({
              icon: 'error',
              text: 'Error while logging in'
            })
          }
        }); 
      }
    });
  }


  signOut(): void {
    this.authService.signOut();
  }

  validateCaptcha = (answer:any) =>{
    this.usersAnswer = answer.target.value;
    if(this.correctAnswer == this.usersAnswer){
      this.validation = true;
    }else{
      this.validation = false;
    }
  }

  redirectToEmailVerification = () =>{
    this.Router.navigate(['email-verification']);
  }

}
