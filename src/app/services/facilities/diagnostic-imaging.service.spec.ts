import { TestBed } from '@angular/core/testing';

import { DiagnosticImagingService } from './diagnostic-imaging.service';

describe('DiagnosticImagingService', () => {
  let service: DiagnosticImagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticImagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
