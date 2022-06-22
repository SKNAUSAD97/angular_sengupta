import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../service/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public user:any;
  public userinfo:any;
  public bookings:any;
  reviewForm : FormGroup;
  reviewCount : any = 0;
  isAvailableReview : any;
  review:any;
  selectreview : boolean = false;


  constructor(private Router:Router, private UserService:UserService, private fb:FormBuilder) {
    this.reviewForm = this.fb.group({  
      review_comment : ['', Validators.required]
    });  
   }

   get f(){
    return this.reviewForm.controls;
  }


  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('user'))){
      this.user = JSON.parse(localStorage.getItem('user'));

      this.UserService.userDetails(this.user.id).subscribe((success:any)=>{
        this.userinfo = success.data;
        this.bookings = success.booking;
        this.isAvailableReview = success.isAvailableReview;
        this.review = success.review;
        console.log(this.isAvailableReview);
        if(this.isAvailableReview == 'yes'){
          this.reviewCount = success.review.review_count;
          this.reviewForm.patchValue({
            review_comment: this.review.comment
          });
          this.reviewForm.controls['review_comment'].disable();
        }
      });
    }
  }

  logout = () =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logme out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.Router.navigate(['login'])
        .then(() => {
          window.location.reload();
        });
      }
    })
  }

  profile = (formValue:any) =>{
    formValue.id = this.userinfo.id;
    this.UserService.updateUser(formValue).subscribe((success:any)=>{
      Swal.fire({
        icon: 'success',
        text: success.message
      })
    });
  }

  getReview = (review:any) =>{
    this.selectreview = true;
    this.reviewCount = review;
  }

  onSubmit = () =>{
    const formData = new FormData;
    formData.append('comment', this.reviewForm.value.review_comment);
    formData.append('review_count', this.reviewCount);
    formData.append('user_id', this.user.id);

    this.UserService.submitReview(formData).subscribe((success:any)=>{
      Swal.fire({
        icon: 'success',
        text: success.message
      })
    });
  }
} 