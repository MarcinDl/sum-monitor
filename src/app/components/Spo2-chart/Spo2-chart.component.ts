import { Component, OnInit } from '@angular/core';
import { Spo2 } from '../../../assets/data/data';
@Component({
  selector: 'Spo2-chart',
  templateUrl: './Spo2-chart.component.html',
  styleUrls: ['./Spo2-chart.component.scss'],
})
export class LineChartComponent implements OnInit {

  constructor() { }
  data = Spo2;
  ngOnInit() { }
  title = 'Spo2';
  type = 'LineChart';
  // data = [
  //   // ["Jan", 7.0, -0.2, -0.9, 3.9],
  //   // ["Feb", 6.9, 0.8, 0.6, 4.2],
  //   // ["Mar", 9.5, 5.7, 3.5, 5.7],
  //   // ["Apr", 14.5, 11.3, 8.4, 8.5],
  //   // ["May", 18.2, 17.0, 13.5, 11.9],
  //   // ["Jun", 21.5, 22.0, 17.0, 15.2],
  //   // ["Jul", 25.2, 24.8, 18.6, 17.0],
  //   // ["Aug", 26.5, 24.1, 17.9, 16.6],
  //   // ["Sep", 23.3, 20.1, 14.3, 14.2],
  //   // ["Oct", 18.3, 14.1, 9.0, 10.3],
  //   // ["Nov", 13.9, 8.6, 3.9, 6.6],
  //   // ["Dec", 9.6, 2.5, 1.0, 4.8]
  //   ["1 sek", 7.0],
  //   ["2 sek", 6.9],
  //   ["3 sek", 9.5],
  //   ["4 sek", 14.5],
  //   ["5 sek", 18.2],
  //   ["6 sek", 21.5],
  //   ["7 sek", 25.2],
  //   ["8 sek", 26.5],
  //   ["9 sek", 23.3],
  //   ["10 sek", 18.3],
  //   ["11 sek", 13.9],
  //   ["12 sek", 9.6]
  // ];
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
