import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';  
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';  
import { filter } from 'rxjs/operators';  
import { UserService } from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  current_url : string = '';
  updated_url : string;
  updated_description : string;
  response : any = []; 

  constructor (private router: Router,  
    private activatedRoute: ActivatedRoute,  
    private titleService: Title, private UserService:UserService, private meta : Meta) {
  }


  ngOnInit() {  
    this.updateUrl();
  } 
  
  updateUrl = () =>{
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {  
        
        this.current_url = window.location.href;
        let data = {url : this.current_url};
        
        this.UserService.getUrl(data).subscribe((success:any)=>{
          this.response = success.data;
          if(this.response == null){
            this.updated_url = 'Sengupta';
            this.updated_description = 'Sengupta Description';
          }else{
           this.updated_url =  this.response.meta_title;
           this.updated_description = this.response.meta_description;
          }
          console.log(this.updated_description);
          this.titleService.setTitle(this.updated_url)
          this.meta.updateTag({ content: this.updated_description} , 'name="description"' );
        });
        }
    );
  }

}
