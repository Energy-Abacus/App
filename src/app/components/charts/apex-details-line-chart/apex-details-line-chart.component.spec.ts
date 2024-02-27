import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApexDetailsLineChartComponent } from './apex-details-line-chart.component';

describe('ApexDetailsLineChartComponent', () => {
  let component: ApexDetailsLineChartComponent;
  let fixture: ComponentFixture<ApexDetailsLineChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApexDetailsLineChartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApexDetailsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
