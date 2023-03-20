import { TestBed } from '@angular/core/testing';

import { PatientsReportsService } from './patients-reports.service';

describe('PatientsReportsService', () => {
  let service: PatientsReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
