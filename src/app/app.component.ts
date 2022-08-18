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
  og :any = { og_locale: '', og_type : '', og_title : '', og_description : '', og_url : '', og_site_name: ''};
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
          this.response = success;
          if(this.response.data == null){
            this.updated_url = 'Sengupta';
            this.updated_description = 'Sengupta Description';
          }else{
           this.updated_url =  this.response.data.meta_title;
           this.updated_description = this.response.data.meta_description;
          }

          if(this.response.og != ''){
            this.og = { og_locale: this.response.og.og_locale, og_type : this.response.og.og_type, og_title : this.response.og.og_title, og_description : this.response.og.og_description, og_url : this.response.og.og_description, og_site_name: this.response.og.og_description};
          }else{
            this.og = { og_locale: '', og_type : '', og_title : '', og_description : '', og_url : '', og_site_name: ''};
          }

          // Updating Og
          
          this.meta.updateTag(
            { property: 'og:locale', content: this.og.og_locale },
          );

          this.meta.updateTag(
            { property: 'og:type', content: this.og.og_type },
          );

          this.meta.updateTag(
            { property: 'og:title', content: this.og.og_title },
          );

          this.meta.updateTag(
            { property: 'og:description', content: this.og.og_description },
          );

          this.meta.updateTag(
            { property: 'og:url', content: this.og.og_url },
          );

          this.meta.updateTag(
            { property: 'og:site_name', content: this.og.og_site_name },
          );

          // Updating Meta 
          this.titleService.setTitle(this.updated_url)
          this.meta.updateTag({ content: this.updated_description} , 'name="description"' );

        });
        }
    );
  }

}
