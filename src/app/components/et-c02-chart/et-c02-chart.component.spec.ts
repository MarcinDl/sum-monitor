import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtC02ChartComponent } from './et-c02-chart.component';

describe('EtC02ChartComponent', () => {
  let component: EtC02ChartComponent;
  let fixture: ComponentFixture<EtC02ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtC02ChartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtC02ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
