import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrescriptionItemComponent } from './create-prescription-item.component';

describe('CreatePrescriptionItemComponent', () => {
  let component: CreatePrescriptionItemComponent;
  let fixture: ComponentFixture<CreatePrescriptionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePrescriptionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrescriptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
