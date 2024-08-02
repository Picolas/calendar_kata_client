import { TestBed } from '@angular/core/testing';

import { RefreshDaysService } from './refresh-days.service';

describe('RefreshDaysService', () => {
  let service: RefreshDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
