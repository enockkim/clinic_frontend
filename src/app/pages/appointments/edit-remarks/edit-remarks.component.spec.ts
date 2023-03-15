import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRemarksComponent } from './edit-remarks.component';

describe('EditRemarksComponent', () => {
  let component: EditRemarksComponent;
  let fixture: ComponentFixture<EditRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
