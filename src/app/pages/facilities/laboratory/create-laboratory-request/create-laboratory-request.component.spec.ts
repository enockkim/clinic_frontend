import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLaboratoryRequestComponent } from './create-laboratory-request.component';

describe('CreateLaboratoryRequestComponent', () => {
  let component: CreateLaboratoryRequestComponent;
  let fixture: ComponentFixture<CreateLaboratoryRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLaboratoryRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLaboratoryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
