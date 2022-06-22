import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../service/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {

  public id:any;
  public response:any;
  constructor(private UserService:UserService, private ActivatedRoute:ActivatedRoute, private Router:Router) { }

  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('user_id');
  }

  otpVerify = (formValue:any) =>{
    var data = {
      user_id : this.id,
      otp : formValue.otp,
    };
    this.UserService.verifyOtp(data).subscribe((success:any)=>{
      this.response = success;
      if(this.response.code == 200){
        Swal.fire({
          icon: 'success',
          text: this.response.message
        })
        localStorage.setItem('user_id', this.response.user_id);
        this.Router.navigate(['reset-password']);
      }else{
        Swal.fire({
          icon: 'error',
          text: this.response.message
        })
      }
    });
  }


}
