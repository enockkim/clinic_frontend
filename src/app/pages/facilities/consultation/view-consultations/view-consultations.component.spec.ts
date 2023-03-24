import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsultationsComponent } from './view-consultations.component';

describe('ViewConsultationsComponent', () => {
  let component: ViewConsultationsComponent;
  let fixture: ComponentFixture<ViewConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConsultationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
