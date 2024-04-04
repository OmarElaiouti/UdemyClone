import { TestBed } from '@angular/core/testing';

import { NavRefreshService } from './nav-refresh.service';

describe('NavRefreshService', () => {
  let service: NavRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
