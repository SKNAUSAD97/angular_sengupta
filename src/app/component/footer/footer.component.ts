import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from "ngx-facebook";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private facebookService: FacebookService) { }

  ngOnInit(): void {
    this.initFacebookService();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:"v3.2"};
    this.facebookService.init(initParams);
  }

}
