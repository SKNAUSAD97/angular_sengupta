import { Component, OnInit } from '@angular/core';
import { UserService} from "../../service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  public response : any; 
  public topic : any; 
  public allTopics : any; 
  public id:any;
  public safeURL:any;
  public user:any;
  public description:any = "";
  public is_course_taken:boolean = false;

  constructor(private UserService:UserService, private ActivatedRoute:ActivatedRoute, private Router:Router,  private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      var user_id = this.user.id
    }else{
      user_id = 0;
    }
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.UserService.getCourseByTopic(this.id, user_id).subscribe((success)=>{
      console.log(success);
      this.response = success;
      this.topic = this.response.topic;
      this.allTopics = this.response.all_topic;
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.topic.video);
      if(this.response.is_course_taken == 1){
        this.is_course_taken = true;
      }
      this.description = this.topic.description;
    });
  }

  changeVideo = (video_url:any, key:any, topic_id:any) =>{
    this.allTopics.map((data, index)=>{
      if(topic_id == data.id){
        this.description = data.description;
      }
    });
    // if(key != 0){
    //   if(this.is_course_taken){
    //     this.topic.video = video_url;
    //     this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.topic.video);
    //   }else{
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'You have not purchased this course !'
    //     })
    //   }
    // }else{
    //   if(this.is_course_taken){
    //     this.topic.video = video_url;
    //     this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.topic.video);
    //   }
    // }

    this.topic.video = video_url;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.topic.video);
  }

}

