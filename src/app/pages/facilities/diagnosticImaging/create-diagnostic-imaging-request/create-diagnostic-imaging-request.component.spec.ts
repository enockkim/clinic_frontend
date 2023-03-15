import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiagnosticImagingRequestComponent } from './create-diagnostic-imaging-request.component';

describe('CreateDiagnosticImagingRequestComponent', () => {
  let component: CreateDiagnosticImagingRequestComponent;
  let fixture: ComponentFixture<CreateDiagnosticImagingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiagnosticImagingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiagnosticImagingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
