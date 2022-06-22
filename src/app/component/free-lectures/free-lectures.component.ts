import { ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from "../../service/user.service";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-free-lectures',
  templateUrl: './free-lectures.component.html',
  styleUrls: ['./free-lectures.component.css']
})
export class FreeLecturesComponent implements OnInit {

  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;
  @ViewChild('mySecondDiv') mySecondDiv: ElementRef<HTMLElement>;
  public response:any;
  public freeLecturecategories:any;
  public safeURL:any;
  constructor(private UserService:UserService, private _sanitizer: DomSanitizer, private Router:Router) { }

  ngOnInit(): void {
    this.UserService.getFreeLecturesCategories().subscribe((success)=>{
      this.response = success;
      if(this.response.code == 200){
        this.freeLecturecategories = this.response.data;
      }else{
        console.log(this.response.message);
        this.freeLecturecategories = this.response.data;
      }
      console.log(this.freeLecturecategories);
    });
  }

  redirectToSinglePage = (lecture_id:any) =>{
    this.Router.navigate([`free-lectures-categorywise/${lecture_id}`]);
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
