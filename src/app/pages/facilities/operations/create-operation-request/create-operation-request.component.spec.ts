import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOperationRequestComponent } from './create-operation-request.component';

describe('CreateOperationRequestComponent', () => {
  let component: CreateOperationRequestComponent;
  let fixture: ComponentFixture<CreateOperationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOperationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOperationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
