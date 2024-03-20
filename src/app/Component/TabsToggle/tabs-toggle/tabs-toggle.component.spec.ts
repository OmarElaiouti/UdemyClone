import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsToggleComponent } from './tabs-toggle.component';

describe('TabsToggleComponent', () => {
  let component: TabsToggleComponent;
  let fixture: ComponentFixture<TabsToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabsToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
