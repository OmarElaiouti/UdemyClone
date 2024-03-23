import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastsliderComponent } from './lastslider.component';

describe('LastsliderComponent', () => {
  let component: LastsliderComponent;
  let fixture: ComponentFixture<LastsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastsliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
