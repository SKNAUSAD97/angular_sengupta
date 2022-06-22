import { ViewChild, Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { UserService} from "../../service/user.service";
import { Router } from "@angular/router";

@Component({ 
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public response :any;
  public courses :any;
  public lectureCategories :any;
  public loggedIn:boolean = false;
  public user:any;
  public id:any;
  public screenHeight:any;
  public screenWidth:any;
  // Styling
  public navbar_mobile:boolean = false;
  public bi_list:boolean = true;
  public bi_x:boolean = false;
  public free_lectures:boolean = false;
  public about:boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    console.log(this.screenHeight, this.screenWidth);
  }

  constructor(private UserService:UserService, private Router:Router) { 
    this.onResize();
  }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = this.user = JSON.parse(localStorage.getItem('user'));
      this.loggedIn = true;
      console.log(this.user);
      this.id = this.user.id
    }else{
      this.loggedIn = false;
      this.id = 0;
    }
    this.UserService.getCourse(this.id).subscribe((success)=>{
      this.response = success;
      this.courses = this.response.data;
    });

    this.UserService.getLectureCategories().subscribe((success)=>{
      this.response = success;
      if(this.response.code == 200){
        this.lectureCategories = this.response.data;
      }else{
        console.log(this.response.message);
        this.lectureCategories = this.response.data;
      }
    });
  }

  courseSingle = (course_id:any) =>{
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      var user_id = this.user.id;
    }else{
      user_id = 0;
    }
    this.Router.navigateByUrl('/dummyroute', { skipLocationChange: true }).then(() =>
    this.Router.navigate(['course/'+ course_id + '/' + user_id]));
  }
 
  redirectToLecturePage = (lecture_id:any) =>{
    this.Router.navigateByUrl('/dummyroutelecture', { skipLocationChange: true }).then(() =>
    this.Router.navigate(['free-lectures-categorywise/'+ lecture_id]));
  }

  toggleMenu = () =>{
    this.navbar_mobile = !this.navbar_mobile;
    this.bi_list = !this.bi_list;
    this.bi_x = !this.bi_x;
  }

  openSubMenuItem = (data:any) =>{
    if(data == 'free-lectures'){
      this.free_lectures = !this.free_lectures;
    }else if(data == 'about'){
      this.about = !this.about
    }
  }

  closeMenu = () =>{
    console.log('clicked..');
    if(this.screenWidth <= 991){
      this.toggleMenu();
    }
    
    // let element:HTMLElement = document.getElementById('bi_x') as HTMLElement;
    // element.click();
  }

}