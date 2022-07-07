import { Component, OnInit } from '@angular/core';
import { UserService} from "../../service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  public api = environment.api;
  public response :any;
  public courses :any;
  public user:any;
  public is_course_taken:boolean = false;
  public price:any;
  review:number;
  reviews:any = [];
  all_reviews:any;
  view:boolean = false;
  public loading:any = true;

  constructor(private UserService:UserService, private Router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      var user_id = this.user.id
    }else{
      user_id = 0;
    }
    this.UserService.getPrice().subscribe((success:any)=>{
      this.response = success;
      this.price = this.response.data;
      this.review = this.response.review;
      this.all_reviews = this.response.reviews;
      this.loading = false;
      this.all_reviews.map((element:any, index:any) => {
          if(index < 2){
            this.reviews.push(element);
          }
      });
    });

    this.UserService.getCourse(user_id).subscribe((success)=>{
      this.response = success;
      console.log(this.response);
      this.courses = this.response.data;
      if(this.response.isCourseTaken == 1){
        this.is_course_taken = true;
      }else{
        this.is_course_taken = false;
      }
    });
  }

  buyCourse = () =>{
    this.Router.navigate(['checkout']);
  }

  courseSingle = (course_id:any) =>{
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      var user_id = this.user.id
    }else{
      user_id = 0;
    }
    this.Router.navigateByUrl('/dummyroute', { skipLocationChange: true }).then(() =>
    this.Router.navigate(['course/'+ course_id + '/' + user_id]));
  }

  payment = (form_value:any) =>{
    
  }

  changeReviewView = () =>{
    this.view = !this.view;
    console.log(this.view);
    if(this.view == true){
      this.reviews = this.all_reviews;
    }else{
      this.reviews = [];
      this.all_reviews.map((element:any, index:any) => {
        if(index < 2){
          this.reviews.push(element);
        }
    });
    }
  }

}
