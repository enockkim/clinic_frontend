import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsDataComponent } from './appointments-data.component';

describe('AppointmentsDataComponent', () => {
  let component: AppointmentsDataComponent;
  let fixture: ComponentFixture<AppointmentsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
