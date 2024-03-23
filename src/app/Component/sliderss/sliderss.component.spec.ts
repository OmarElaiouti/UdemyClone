import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderssComponent } from './sliderss.component';

describe('SliderssComponent', () => {
  let component: SliderssComponent;
  let fixture: ComponentFixture<SliderssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SliderssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
