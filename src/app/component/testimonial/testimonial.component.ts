import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  testimonials:any;
  groupList:any = [];
  constructor(private UserService:UserService) { }

  ngOnInit(): void {

    this.UserService.getTestimonials().subscribe((success)=>{
      this.testimonials = success;
    });
  }

}
