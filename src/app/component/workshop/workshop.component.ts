import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {

  public response:any;
  public workshop:any;
  constructor(private UserService:UserService) { }

  ngOnInit(): void {
    this.UserService.getWorkshop().subscribe((success:any)=>{
      this.response = success;
      this.workshop = this.response.data;
    });
  }

}
