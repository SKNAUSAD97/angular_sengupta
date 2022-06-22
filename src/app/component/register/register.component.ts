import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  loggedIn: boolean;
  public firstRandomNumber:number = 0;
  public secondRandomNumber:number = 0;
  public correctAnswer:number = 0;
  public usersAnswer:number = 0;
  public validation:boolean = true;
  user: SocialUser;
  public response:any = '';

  constructor(private UserService : UserService, private Router:Router, private authService:SocialAuthService) { }

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    this.firstRandomNumber = Math.floor((Math.random() * 10) + 1);
    this.secondRandomNumber = Math.floor((Math.random() * 11) + 1);

    this.correctAnswer = this.firstRandomNumber + this.secondRandomNumber;
  }

  register = (formValue:any) =>{
    if(this.validation){
      this.UserService.userRegister(formValue).subscribe((success)=>{
        this.response = success;
        if(this.response.code == 200){
          Swal.fire('Thank you...', 'You are now registered!', 'success');
          this.Router.navigate(['login']);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You are already registered..',
          })
        }
      });
    }else{
      
    }
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
            this.Router.navigate(['dashboard'])
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
            this.Router.navigate(['dashboard'])
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

}
