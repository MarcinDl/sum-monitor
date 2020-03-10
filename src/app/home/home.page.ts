import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  data: any;
  now: any;
  public date: string = new Date().toISOString();
  // myDate: String = new Date().toISOString();
  myDate: Date;
  constructor() { }

  ngOnInit() {
    fetch('./assets/data/data.ts').then(res => res.json())
      .then(json => {
        this.data = json;

        for (let item of this.data) {
          console.log(item.company)
        }
      });

    setInterval(() => {         //replaced function() by ()=>
      this.myDate = new Date();
      console.log(this.myDate); // just testing if it is working
    }, 1000);

  }
}