import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearAppointmentComponent } from './clear-appointment.component';

describe('ClearAppointmentComponent', () => {
  let component: ClearAppointmentComponent;
  let fixture: ComponentFixture<ClearAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
