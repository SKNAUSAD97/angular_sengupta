import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public response :any;
  public user:any;
  public modules:any;
  public price:any = 0;
  public coupon_code:any = "";
  public is_free:boolean = false;
  

  constructor(private UserService:UserService, private Router:Router, private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.UserService.getPrice().subscribe((success:any)=>{
      this.response = success;
      this.price = this.response.data.price;
    });

    this.UserService.getAllCourse().subscribe((success:any)=>{
     this.response = success;
     if(this.response.code == 200){
      this.modules = this.response.data;
      console.log(this.modules);
     }
    });
  }

  buyCourse = () =>{
    var coupon_code = this.coupon_code;
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      var data = {
        user_id : this.user.id,
        coupon_code:coupon_code,
        price:this.price
      }
      this.UserService.buyCourse(data).subscribe((success)=>{
        this.response = success;
        if(this.response.code == 200){
          if(this.is_free){
            Swal.fire({
              icon: 'success',
              text: 'You have successfully bought this course..'
            })
            this.Router.navigate(['course']);
          }else{
            window.location.href = `${environment.web_url}payu-money-payment?coupon_id=itwkaaclthjukqqigigldeejzvrhkqwavdqwxwnqdfgbaxrbufomzyduqlehopvgsmmikpmsdiphejaikkuzvikfzwdyseaduznjsuzayiiqvtpzgeofuxbmtxuqgsnvgmkmrfjeaudtuojpgracesnsmgjylbwk&data=${this.response.price}`;
            // window.location.href = `http://localhost:8000/payu-money-payment?coupon_id=itwkaaclthjukqqigigldeejzvrhkqwavdqwxwnqdfgbaxrbufomzyduqlehopvgsmmikpmsdiphejaikkuzvikfzwdyseaduznjsuzayiiqvtpzgeofuxbmtxuqgsnvgmkmrfjeaudtuojpgracesnsmgjylbwk&data=${this.response.price}`;
          }
          
        }else{
          console.log(this.response);
        }
      });
    }else{
      this.Router.navigate(['login']);
    }
  }

  couponSubmit = (formValue:any) =>{
   this.coupon_code = formValue.coupon_code;
    this.UserService.checkCoupon(formValue).subscribe((success:any)=>{
      this.response = success;
      this.price = success;
      if(success == 2499){
        Swal.fire({
          icon: 'error',
          text: 'Coupon Code not Matched..'
        })
      }else if(success == 0){
        this.is_free = true;
        Swal.fire({
          icon: 'success',
          text: 'Discount Added..'
        })
      }else{
        Swal.fire({
          icon: 'success',
          text: 'Discount Added..'
        })
        this.is_free = false;
      }
     });
  }

}
