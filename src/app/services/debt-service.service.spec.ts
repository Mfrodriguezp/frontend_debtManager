import { TestBed } from '@angular/core/testing';

import { DebtServiceService } from './debt-service.service';

describe('DebtServiceService', () => {
  let service: DebtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
