import { Component, OnInit } from '@angular/core';
import { EtC02 } from "./../../../assets/data/data";
@Component({
  selector: 'app-et-c02-chart',
  templateUrl: './et-c02-chart.component.html',
  styleUrls: ['./et-c02-chart.component.scss'],
})
export class EtC02ChartComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  data = EtC02;
  title = 'EtC02';
  type = 'LineChart';
  columnNames = ["Liczba", "1"];
  options = {
    hAxis: {
      title: 'Czas'
    },
    vAxis: {
      title: 'Liczba '
    },
  };
  width = 550;
  height = 400;
}
