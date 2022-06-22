import { ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from "../../service/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;
  @ViewChild('mySecondDiv') mySecondDiv: ElementRef<HTMLElement>;
  

  public testimonials:any;
  public blogs:any;
  public blogdata:any;
  public clients:any;
  public response:any;

  
  IsmodelShow : boolean = true;
  constructor(
    private UserService:UserService,
    private Router:Router
  ) { }

  ngOnInit(): void {

    

    setTimeout(()=>{                      
      let element:HTMLElement = document.getElementById('button-scnd-click') as HTMLElement;
      element.click();
    }, 3000);

    this.UserService.getTestimonials().subscribe((success)=>{
      this.testimonials = success;
    });

    this.UserService.getThreeBlogs().subscribe((success)=>{
      this.response = success;
      this.blogs = this.response.data;
      console.log(this.blogs);
    });

      this.clients = [
          'assets/user/assets/img/client/aims.jpg',
          'assets/user/assets/img/client/aravind.jpg',
          'assets/user/assets/img/client/byos.jpg',
          'assets/user/assets/img/client/chitkara.jpg',
          'assets/user/assets/img/client/disha.jpg',
          'assets/user/assets/img/client/gei-institute.jpg',
          'assets/user/assets/img/client/jipmer.jpg',
          'assets/user/assets/img/client/mn-eye.jpg',
          'assets/user/assets/img/client/narayan.jpg',
          'assets/user/assets/img/client/new-york-ecc.jpg',
          'assets/user/assets/img/client/nio.jpg',
          'assets/user/assets/img/client/osi.jpg',
          'assets/user/assets/img/client/pimec.jpg',
          'assets/user/assets/img/client/raipur.jpg',
          'assets/user/assets/img/client/sankara-netralaya.jpg'
      ];
  }
  openSecondModal = () =>{
    let element:HTMLElement = document.getElementById('button-click') as HTMLElement;
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

  fellowship = (formValue:any) =>{
    var data = {
      email : formValue.email,
      type : 'fellowship',
    }
    this.UserService.newsLetterUpdate(data).subscribe((success:any)=>{
      Swal.fire({
        icon: 'success',
        text: 'We will get back to you soon!',
      })
      let el: HTMLElement = this.mySecondDiv.nativeElement;
      el.click();
    });
  }

  redirectToSinglePage= (blog_id:any, blog_name) =>{
    this.Router.navigate([`blog/${blog_id}/${blog_name.replace(/\s+/g, '-').toLowerCase()}`]);
  }

  redirectToPage = (page:any) =>{
    // console.log(page);return;
    this.Router.navigate([page]);
  }
}
