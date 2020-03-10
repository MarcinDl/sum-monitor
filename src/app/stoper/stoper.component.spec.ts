import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoperComponent } from './stoper.component';

describe('StoperComponent', () => {
  let component: StoperComponent;
  let fixture: ComponentFixture<StoperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
