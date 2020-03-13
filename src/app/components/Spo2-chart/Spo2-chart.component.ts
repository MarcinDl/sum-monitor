import { Component, OnInit } from '@angular/core';
import { Spo2 } from '../../../assets/data/data';
import * as d3 from "d3";

@Component({
  selector: 'Spo2-chart',
  templateUrl: './Spo2-chart.component.html',
  styleUrls: ['./Spo2-chart.component.scss'],
})
export class LineChartComponent implements OnInit {

  // constructor() { }
  // data = Spo2;
  // ngOnInit() { }
  // title = 'Spo2';
  // type = 'LineChart';
  // // data = [
  // //   // ["Jan", 7.0, -0.2, -0.9, 3.9],
  // //   // ["Feb", 6.9, 0.8, 0.6, 4.2],
  // //   // ["Mar", 9.5, 5.7, 3.5, 5.7],
  // //   // ["Apr", 14.5, 11.3, 8.4, 8.5],
  // //   // ["May", 18.2, 17.0, 13.5, 11.9],
  // //   // ["Jun", 21.5, 22.0, 17.0, 15.2],
  // //   // ["Jul", 25.2, 24.8, 18.6, 17.0],
  // //   // ["Aug", 26.5, 24.1, 17.9, 16.6],
  // //   // ["Sep", 23.3, 20.1, 14.3, 14.2],
  // //   // ["Oct", 18.3, 14.1, 9.0, 10.3],
  // //   // ["Nov", 13.9, 8.6, 3.9, 6.6],
  // //   // ["Dec", 9.6, 2.5, 1.0, 4.8]
  // //   ["1 sek", 7.0],
  // //   ["2 sek", 6.9],
  // //   ["3 sek", 9.5],
  // //   ["4 sek", 14.5],
  // //   ["5 sek", 18.2],
  // //   ["6 sek", 21.5],
  // //   ["7 sek", 25.2],
  // //   ["8 sek", 26.5],
  // //   ["9 sek", 23.3],
  // //   ["10 sek", 18.3],
  // //   ["11 sek", 13.9],
  // //   ["12 sek", 9.6]
  // // ];
  // columnNames = ["Liczba", "1"];
  // options = {
  //   hAxis: {
  //     title: 'Czas'
  //   },
  //   vAxis: {
  //     title: 'Liczba '
  //   },
  // };
  // width = 550;
  // height = 400;


  public lineArr = [];
  public MAX_LENGTH = 100;
  public duration = 500;
  public chart = this.realTimeLineChart();

  randomNumberBounds(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  seedData() {
    var now = new Date();
    for (var i = 0; i < this.MAX_LENGTH; ++i) {
      this.lineArr.push({
        time: new Date(now.getTime() - ((this.MAX_LENGTH - i) * this.duration)),
        x: this.randomNumberBounds(0, 5),
        y: this.randomNumberBounds(0, 2.5),
        z: this.randomNumberBounds(0, 10)
      });
    }
  }

  updateData() {
    var now = new Date();

    var lineData = {
      time: now,
      x: this.randomNumberBounds(0, 5),
      y: this.randomNumberBounds(0, 2.5),
      z: this.randomNumberBounds(0, 10)
    };
    console.log(lineData)
    this.lineArr.push(lineData);

    if (this.lineArr.length > 30) {
      this.lineArr.shift();
    }
    d3.select(".chart").datum(this.lineArr).call(this.chart);
  }

  resize() {
    if (d3.select(".chartspo2 svg").empty()) {
      return;
    }
    this.chart.width(+d3.select(".chartspo2").style("width").replace(/(px)/g, ""));
    d3.select(".chartspo2").call(this.chart);
  }

  // document.addEventListener("DOMContentLoaded", function() {
  //   this.seedData();
  //   window.setInterval(this.updateData, 500);
  //   d3.select("#chart").datum(this.lineArr).call(this.chart);
  //   d3.select(window).on('resize', this.resize);
  // });
  constructor() {

  }

  ngOnInit() {
    // document.addEventListener("DOMContentLoaded", function () {
    this.seedData();
    window.setInterval(this.updateData.bind(this), 500);
    d3.select(".chartspo2").datum(this.lineArr).call(this.chart);
    d3.select(window).on('resize', this.resize);
    // });

    // d3.select("p").style("color", "red");  <-- to było do innego zadania
  }

  // clicked(event: any) {  <-- to było do innego zadania
  //   d3.select(event.target)
  //     .append("circle")
  //     .attr("cx", event.x)
  //     .attr("cy", event.y)
  //     .attr("r", 7)
  //     .attr("fill", "red")
  // }



  ///////////////////script.js

  realTimeLineChart() {
    var margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = 600,
      height = 400,
      duration = 500,
      color = d3.schemeCategory10;

    function chart(selection) {
      // Based on https://bl.ocks.org/mbostock/3884955
      selection.each(function (data) {
        data = ["x", "y", "z"].map(function (c) {
          return {
            label: c,
            values: data.map(function (d) {
              return { time: +d.time, value: d[c] };
            })
          };
        });

        var t = d3.transition().duration(duration).ease(d3.easeLinear),
          x = d3.scaleTime().rangeRound([0, width - margin.left - margin.right]),
          y = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]),
          z = d3.scaleOrdinal(color);

        var xMin = d3.min(data, function (c) { return d3.min(c.values, function (d) { return d.time; }) });
        var xMax = new Date(new Date(d3.max(data, function (c) {
          return d3.max(c.values, function (d) { return d.time; })
        })).getTime() - (duration * 2));

        x.domain([xMin, xMax]);
        y.domain([
          d3.min(data, function (c) { return d3.min(c.values, function (d) { return d.value; }) }),
          d3.max(data, function (c) { return d3.max(c.values, function (d) { return d.value; }) })
        ]);
        z.domain(data.map(function (c) { return c.label; }));

        var line = d3.line()
          .curve(d3.curveBasis)
          .x(function (d) { return x(d.time); })
          .y(function (d) { return y(d.value); });

        var svg = d3.select(this).selectAll("svg").data([data]);
        var gEnter = svg.enter().append("svg").append("g");
        gEnter.append("g").attr("class", "axis x");
        gEnter.append("g").attr("class", "axis y");
        gEnter.append("defs").append("clipPath")
          .attr("id", "clip")
          .append("rect")
          .attr("width", width - margin.left - margin.right)
          .attr("height", height - margin.top - margin.bottom);
        gEnter.append("g")
          .attr("class", "lines")
          .attr("clip-path", "url(#clip)")
          .selectAll(".data").data(data).enter()
          .append("path")
          .attr("class", "data");

        var legendEnter = gEnter.append("g")
          .attr("class", "legend")
          .attr("transform", "translate(" + (width - margin.right - margin.left - 75) + ",25)");
        legendEnter.append("rect")
          .attr("width", 50)
          .attr("height", 75)
          .attr("fill", "#ffffff")
          .attr("fill-opacity", 0.7);
        legendEnter.selectAll("text")
          .data(data).enter()
          .append("text")
          .attr("y", function (d, i) { return (i * 20) + 25; })
          .attr("x", 5)
          .attr("fill", function (d) { return z(d.label); });

        var svg = selection.select("svg");
        svg.attr('width', width).attr('height', height);
        var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        g.select("g.axis.x")
          .attr("transform", "translate(0," + (height - margin.bottom - margin.top) + ")")
          .transition(t)
          .call(d3.axisBottom(x).ticks(5));
        g.select("g.axis.y")
          .transition(t)
          .attr("class", "axis y")
          .call(d3.axisLeft(y));

        g.select("defs clipPath rect")
          .transition(t)
          .attr("width", width - margin.left - margin.right)
          .attr("height", height - margin.top - margin.right);

        g.selectAll("g path.data")
          .data(data)
          .style("stroke", function (d) { return z(d.label); })
          .style("stroke-width", 1)
          .style("fill", "none")
          .transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .on("start", tick);

        g.selectAll("g .legend text")
          .data(data)
          .text(function (d) {
            return d.label.toUpperCase() + ": " + d.values[d.values.length - 1].value;
          });

        // For transitions https://bl.ocks.org/mbostock/1642874
        function tick() {
          d3.select(this)
            .attr("d", function (d) { return line(d.values); })
            .attr("transform", null);

          var xMinLess = new Date(new Date(xMin).getTime() - duration);
          d3.active(this)
            .attr("transform", "translate(" + x(xMinLess) + ",0)")
            .transition()
            .on("start", tick);
        }
      });
    }

    chart.margin = function (_) {
      if (!arguments.length) return margin;
      margin = _;
      return chart;
    };

    chart.width = function (_) {
      if (!arguments.length) return width;
      width = _;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) return height;
      height = _;
      return chart;
    };

    chart.color = function (_) {
      if (!arguments.length) return color;
      color = _;
      return chart;
    };

    chart.duration = function (_) {
      if (!arguments.length) return duration;
      duration = _;
      return chart;
    };

    return chart;
  }

}
