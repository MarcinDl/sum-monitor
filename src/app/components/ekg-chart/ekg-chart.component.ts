import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { ECG } from "./ECG"
@Component({
  selector: 'app-ekg-chart',
  templateUrl: './ekg-chart.component.html',
  styleUrls: ['./ekg-chart.component.scss'],
})


export class EkgChartComponent implements OnInit {

  constructor() {  // // A Simple Point in Euclidean Space
  }

  ngOnInit() { }


  ////////////////////////////

  public MAX_X = 12;
  public MAX_Y = 5;
  public MIN_Y = -3;
  public MASK_WIDTH = 0.5;
  public MASK_STEP_SIZE = 0.1;
  public MASK_TRANSITION_DURATION = 50;

  public svg = d3.select("svg");
  public width = +this.svg.attr("width");
  public height = +this.svg.attr("height");
  public g = this.svg.append("g");

  public ecg = new ECG();
  public data = [];

  public x = d3.scaleLinear()
    .domain([0, this.MAX_X])
    .range([0, this.width]);

  public y = d3.scaleLinear()
    .domain([this.MIN_Y, this.MAX_Y])
    .range([this.height, 0]);

  public line = d3.line()
    .curve(d3.curveBasis)
    .x(function (d, i) { return this.x(d.getX()); })
    .y(function (d, i) { return this.y(d.getY()); });

  public clip_path = this.g.append("defs")
    .append("defs")
    .append("clipPath")
    .attr("id", "clip");

  public clip_rect_1 = this.clip_path
    .append("rect")
    .attr("width", 0)
    .attr("height", this.height);

  public clip_rect_2 = this.clip_path.append("rect")
    .attr("x", this.x(this.MASK_WIDTH))
    .attr("width", this.x(this.MAX_X - this.MASK_WIDTH))
    .attr("height", this.height);

  public path = this.g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(this.data)
    .attr("class", "line")
    .attr("d", this.line);

  extObjectValues(obj) {
    if (typeof obj.values === 'undefined') {
      return Object.keys(obj).map(key => obj[key])
    }

    return obj.values();
  }

  // // A Simple Point in Euclidean Space
  Point(x, y) {
    return {
      x: x,
      y: y,
      getX: function () { return this.x },
      getY: function () { return this.y }
    };
  }

  tick();

  tick() {
    // Move the clip masks
    var delta_x = this.x(this.MASK_STEP_SIZE);
    var left_rect = this.clip_rect_1;
    var right_rect = this.clip_rect_2;
    if (+left_rect.attr("x") > +right_rect.attr("x") ||
      +left_rect.attr("x") + +left_rect.attr("width") > +right_rect.attr("x") + +right_rect.attr("width")) {
      left_rect = this.clip_rect_2;
      right_rect = this.clip_rect_1;
    }
    var next_left_x = +left_rect.attr("x");
    var next_left_width = +left_rect.attr("width");
    var next_right_x = +right_rect.attr("x");
    var next_right_width = +right_rect.attr("width");

    // Case 1: We have a single mask while the gap moves from the right edge
    // to the left edge.
    //
    // |XXXXXXXX | => | XXXXXXXX|
    //
    // Left mask remains unchanged, right masks translates to the right.
    if (+right_rect.attr("x") >= this.x(this.MAX_X) ||
      +right_rect.attr("x") + +right_rect.attr("width") < this.x(this.MAX_X)) {
      if (+right_rect.attr("x") >= this.x(this.MAX_X)) {
        var temp_rect = left_rect;
        left_rect = right_rect;
        right_rect = temp_rect;

        next_left_x = 0;
        next_left_width = 0;
        next_right_width = +right_rect.attr("width");

        left_rect
          .attr("x", 0)
          .attr("width", 0)
          .attr("transform", null);
      }

      next_right_x = +right_rect.attr("x") + this.x(this.MASK_STEP_SIZE);
    }

    // Case 2: We have a left mask and a right mask, leaving  agap in the
    // middle
    //
    // |XXXX XXXX| => |XXXXX XXX|
    //
    // Expand the left mask, and move the right mask while contracting it.
    else {
      next_left_width += this.x(this.MASK_STEP_SIZE);
      next_right_x += this.x(this.MASK_STEP_SIZE);
      next_right_width -= this.x(this.MASK_STEP_SIZE);
    }

    var t = left_rect.transition()
      .attr("x", next_left_x)
      .attr("width", next_left_width)
      .duration(this.MASK_TRANSITION_DURATION)
      .ease(d3.easeLinear);

    right_rect.transition(t)
      .attr("x", next_right_x)
      .attr("width", next_right_width)
      .duration(this.MASK_TRANSITION_DURATION)
      .ease(d3.easeLinear)
      .on("end", this.tick);

    // update the data
    var update_datum = (new_x, new_y) => {
      if (new_x % this.MAX_X / this.ecg.getStepSize() >= this.data.length)
        this.data.push(new Point(new_x, new_y));
      // this.data.push(this.Point(new_x, new_y));
      else
        this.data[new_x / this.ecg.getStepSize()] = new Point(new_x, new_y);
      // this.data[new_x / this.ecg.getStepSize()] = this.Point(new_x, new_y);
    };

    var new_datum = this.ecg.tick();
    var new_x = new_datum[0];
    var new_y = new_datum[1];

    while (new_x % this.MAX_X < (this.x.invert(next_right_x) - this.MASK_WIDTH / 2.0) % this.MAX_X) {
      update_datum(new_x, new_y);

      new_datum = this.ecg.tick();
      new_x = new_datum[0];
      new_y = new_datum[1];
    }
    update_datum(new_x, new_y);

    this.path
      .transition()
      .selection()
      .interrupt()
      .attr("d", this.line)
      .attr("transform", null);
  }



}
