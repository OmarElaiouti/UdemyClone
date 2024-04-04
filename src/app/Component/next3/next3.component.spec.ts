import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Next3Component } from './next3.component';

describe('Next3Component', () => {
  let component: Next3Component;
  let fixture: ComponentFixture<Next3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Next3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Next3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
