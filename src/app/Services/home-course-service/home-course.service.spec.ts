import { TestBed } from '@angular/core/testing';

import { HomeCourseService } from './home-course.service';

describe('HomeCourseService', () => {
  let service: HomeCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
