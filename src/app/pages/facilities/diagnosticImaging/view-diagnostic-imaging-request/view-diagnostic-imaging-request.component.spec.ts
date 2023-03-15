import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiagnosticImagingRequestComponent } from './view-diagnostic-imaging-request.component';

describe('ViewDiagnosticImagingRequestComponent', () => {
  let component: ViewDiagnosticImagingRequestComponent;
  let fixture: ComponentFixture<ViewDiagnosticImagingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDiagnosticImagingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiagnosticImagingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
