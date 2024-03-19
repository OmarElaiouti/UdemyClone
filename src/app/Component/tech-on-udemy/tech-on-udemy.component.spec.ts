import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechOnUdemyComponent } from './tech-on-udemy.component';

describe('TechOnUdemyComponent', () => {
  let component: TechOnUdemyComponent;
  let fixture: ComponentFixture<TechOnUdemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechOnUdemyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechOnUdemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
