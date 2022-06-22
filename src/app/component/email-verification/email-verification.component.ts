import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  public response:any;
  constructor(private UserService:UserService, private Router:Router) { }

  ngOnInit(): void {
  }

  emailVerify = (formValue:any) =>{
    this.UserService.emailVerifation(formValue.email).subscribe((success:any)=>{
      this.response = success;
      if(this.response.code == 200){
        Swal.fire({ 
          icon: 'success',
          text: this.response.message
        })
        this.Router.navigate([`otp-verification/${this.response.user_id}`]);
      }else{
        Swal.fire({
          icon: 'error',
          text: this.response.message
        })
      }
    });
  }

}
