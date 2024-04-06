import { TestBed } from '@angular/core/testing';

import { AddRoleServiceService } from './add-role-service.service';

describe('AddRoleServiceService', () => {
  let service: AddRoleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRoleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
