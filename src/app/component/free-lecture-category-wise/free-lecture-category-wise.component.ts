import { ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import { UserService} from "../../service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-free-lecture-category-wise',
  templateUrl: './free-lecture-category-wise.component.html',
  styleUrls: ['./free-lecture-category-wise.component.css']
})
export class FreeLectureCategoryWiseComponent implements OnInit {

  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;
  @ViewChild('mySecondDiv') mySecondDiv: ElementRef<HTMLElement>;
  public id:any;
  public response:any;
  public freeLectures:any;
  public status:any = false;
  public safeURL:any;
  public loading:any = true;

  constructor(private UserService:UserService, private ActivatedRoute:ActivatedRoute, private Router:Router, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.UserService.getFreeLecturesCategoryWise(this.id).subscribe((success)=>{
      this.response = success;
      this.loading = false;
      if(this.response.code == 200){
        this.freeLectures = this.response.data;
        this.status = false;
        this.freeLectures.map((data:any, index:any)=>{
          this.freeLectures[index].video = this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(data.video);
        });
      }else{
        console.log(this.response.message);
        this.freeLectures = this.response.data;
        this.status = true;
      }
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
 