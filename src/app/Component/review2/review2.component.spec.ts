import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Review2Component } from './review2.component';

describe('Review2Component', () => {
  let component: Review2Component;
  let fixture: ComponentFixture<Review2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Review2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Review2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
