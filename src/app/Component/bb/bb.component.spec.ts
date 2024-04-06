import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbComponent } from './bb.component';

describe('BbComponent', () => {
  let component: BbComponent;
  let fixture: ComponentFixture<BbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
