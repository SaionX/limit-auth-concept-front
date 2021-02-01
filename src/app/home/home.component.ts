import { Component, OnInit } from '@angular/core';
import {HomeService} from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeMessage: string;

  constructor(
    public homeService: HomeService
  ) { }

  ngOnInit(): void {
  }

  loadHomeMessage() {
    this.homeService.getHello().subscribe(resp => {
      this.homeMessage = resp['msg'];
    }, error => {
      this.homeMessage = error;
    })
    this.homeMessage = "";
  }
}
