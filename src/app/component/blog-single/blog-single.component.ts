import { ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from "../../service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
 
@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.css']
})
export class BlogSingleComponent implements OnInit {
  
  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;
  @ViewChild('mySecondDiv') mySecondDiv: ElementRef<HTMLElement>;

  public response:any;
  public blog:any;
  public id:any;

  constructor(private UserService:UserService, private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.UserService.getSingleBlog(this.id).subscribe((success)=>{
      this.response = success;
      this.blog = this.response.data;
      console.log(this.blog);
    });
  }

  newsLetter = () =>{
    let element:HTMLElement = document.getElementById('button-scnd-click') as HTMLElement;
      element.click();
  }

  subscription = (formValue:any) =>{
    var data = {
      name : formValue.name,
      email : formValue.email,
      type : 'news-letter',
    }
    this.UserService.newsLetterUpdate(data).subscribe((success:any)=>{
     Swal.fire({
       icon: 'success',
       text: 'We will get back to you soon!',
     })
     let el: HTMLElement = this.myDiv.nativeElement;
     el.click();
   });
 }

}
