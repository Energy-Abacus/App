import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApexDetailsTemperatureComponent } from './apex-details-temperature.component';

describe('ApexDetailsTemperatureComponent', () => {
  let component: ApexDetailsTemperatureComponent;
  let fixture: ComponentFixture<ApexDetailsTemperatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApexDetailsTemperatureComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApexDetailsTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
