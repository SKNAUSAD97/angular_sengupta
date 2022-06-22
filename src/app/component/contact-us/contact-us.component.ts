import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  
  public details = {name : '', mobile :'',  email: '', subject: '', message: ''};
  constructor(private UserService:UserService) { }

  ngOnInit(): void {
  }

  contact = (argument:any) =>{
    this.UserService.contactSubmit(this.details).subscribe((succss:any)=>{
      const response = succss;
      if(response.code == 200){
        Swal.fire({
          icon: 'success',
          text: response.message
        })
      }
    });
  }

}
