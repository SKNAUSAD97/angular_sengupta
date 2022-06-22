import { Component, OnInit } from '@angular/core';
import { UserService} from "../../service/user.service";

@Component({
  selector: 'app-fellowship',
  templateUrl: './fellowship.component.html',
  styleUrls: ['./fellowship.component.css']
})
export class FellowshipComponent implements OnInit {

  public fellowship : any;
  public response:any;
  constructor(private UserService:UserService) { }

  ngOnInit(): void {
    this.UserService.getFellowship().subscribe((success:any)=>{
      this.response = success;
      this.fellowship = this.response.data;
      console.log(this.fellowship);
    });
  }

}
