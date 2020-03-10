import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EkgChartComponent } from './ekg-chart.component';

describe('EkgChartComponent', () => {
  let component: EkgChartComponent;
  let fixture: ComponentFixture<EkgChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EkgChartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EkgChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
