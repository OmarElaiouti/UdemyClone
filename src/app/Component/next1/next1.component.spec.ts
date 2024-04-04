import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Next1Component } from './next1.component';

describe('Next1Component', () => {
  let component: Next1Component;
  let fixture: ComponentFixture<Next1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Next1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Next1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
