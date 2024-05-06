import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatorySnapComponent } from './mandatory-snap.component';

describe('MandatorySnapComponent', () => {
  let component: MandatorySnapComponent;
  let fixture: ComponentFixture<MandatorySnapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MandatorySnapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MandatorySnapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
