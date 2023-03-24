import { TestBed } from '@angular/core/testing';

import { FinanceReportsService } from './finance-reports.service';

describe('FinanceReportsService', () => {
  let service: FinanceReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
