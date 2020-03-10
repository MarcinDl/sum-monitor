import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stoper',
  templateUrl: './stoper.component.html',
  styleUrls: ['./stoper.component.scss'],
})
export class StoperComponent implements OnInit {
  public start: any;
  public sec = 0; public min = 0;
  public interval: any;

  constructor() { }

  ngOnInit() {
    this.start = "start"
  }

  begin() {

    if (this.start == "start") {
      this.start = "pausa";
      this.interval = setInterval(function () {

        if (this.sec > 60) { this.sec = 1; this.min++ }
        console.log(this.min, this.sec++);
        this.min = this.min;
        this.isec = this.isec;
      }.bind(this), 1000)

      // return [this.min,this.sec]
    }
    else {
      this.start = "start"
      clearInterval(this.interval)
    }
  }

  reset() {
    clearInterval(this.interval)
    this.sec = 0;
    this.min = 0;
  }


}
