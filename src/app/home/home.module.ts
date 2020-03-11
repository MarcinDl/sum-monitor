import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { StoperComponent } from './../components/stoper/stoper.component';
import { LineChartComponent } from '../components/Spo2-chart/Spo2-chart.component';
import { EkgChartComponent } from './../components/ekg-chart/ekg-chart.component';
import { EtC02ChartComponent } from './../components/et-c02-chart/et-c02-chart.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, StoperComponent, LineChartComponent, EkgChartComponent, EtC02ChartComponent]
})
export class HomePageModule { }
