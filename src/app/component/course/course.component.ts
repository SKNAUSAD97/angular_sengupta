import { Component, OnInit } from '@angular/core';
import { UserService} from "../../service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public response : any; 
  public course : any; 
  public id:any;
  public user:any;
  public is_course_taken:boolean = false;
  public is_first_module:boolean = false;

  constructor(private UserService:UserService, private ActivatedRoute:ActivatedRoute, private Router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      var user_id = this.user.id
    }else{
      user_id = 0;
    }
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.UserService.getSingleCourse(this.id, user_id).subscribe((success)=>{
      this.response = success;
      this.course = this.response.data;
      if(this.course.is_course_taken == 1){
        this.is_course_taken = true;
      }
      if(this.response.isFirstKey){
        this.is_first_module = true;
      }
    });
  }

  playVideo = (topic_id:any, key:any) =>{
    // If the course is not taken then condition will be applied otherwise no conditions wil be applied
    if(this.is_course_taken == false){
      // if(key == 0 && this.is_first_module){
      if(this.is_first_module){
        this.Router.navigate([`play-video/${topic_id}`]);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You have not purchased this course !'
        })
      }
    }else{
      this.Router.navigate([`play-video/${topic_id}`]);
    }
  }

  isLoggedIn = () =>{
    if(this.is_course_taken == false){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have not purchased this course !'
      })
    }else{
      console.log('hellow');
    }
  }
}
