import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  public blogs:any;
  public loading:any = true;
  public response:any;
  constructor(private UserService:UserService, private Router:Router) { }

  ngOnInit(): void {
    this.UserService.getBlogs().subscribe((success)=>{
      this.response = success;
      this.blogs = this.response;
      this.loading = false;
    });
  }

  redirectToSinglePage= (blog_id:any, blog_name) =>{
    this.Router.navigate([`blog/${blog_id}/${blog_name.replace(/\s+/g, '-').toLowerCase()}`]);
  }

  redirectToFellowship = () =>{
    this.Router.navigate(['fellowship']);
  }

}
