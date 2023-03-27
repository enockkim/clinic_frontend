import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrescriptionReportComponent } from './view-prescription-report.component';

describe('ViewPrescriptionReportComponent', () => {
  let component: ViewPrescriptionReportComponent;
  let fixture: ComponentFixture<ViewPrescriptionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrescriptionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrescriptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
