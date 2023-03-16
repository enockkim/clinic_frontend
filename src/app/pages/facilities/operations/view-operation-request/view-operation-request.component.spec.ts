import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOperationRequestComponent } from './view-operation-request.component';

describe('ViewOperationRequestComponent', () => {
  let component: ViewOperationRequestComponent;
  let fixture: ComponentFixture<ViewOperationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOperationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOperationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
