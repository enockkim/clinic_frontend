import { TestBed } from '@angular/core/testing';

import { PharmacyReportsService } from './pharmacy-reports.service';

describe('PharmacyReportsService', () => {
  let service: PharmacyReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacyReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
