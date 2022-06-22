import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public error:boolean = false;
  public response:any; 
  constructor(private UserService:UserService, private Router:Router) { }

  ngOnInit(): void {
  }

  resetPassword = (formValue:any) =>{
    if(localStorage.getItem('user_id')){

      var data = {
        user_id : localStorage.getItem('user_id'),
        password : formValue.password
      };
      
      if(formValue.password == formValue.re_password){
          this.UserService.resetPassword(data).subscribe((success)=>{
            Swal.fire({
              icon: 'success',
              text: 'Your Password Has been changed...'
            })
            localStorage.removeItem('user_id');
            this.Router.navigate(['/']);
          });
      }else{
        this.error = true;
      }
    }else{
      Swal.fire({
        icon: 'error',
        text: 'OTP is not verified'
      })
    }
  }

}
