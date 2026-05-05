import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiColorTest } from './ui-color-test';

describe('UiColorTest', () => {
  let component: UiColorTest;
  let fixture: ComponentFixture<UiColorTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiColorTest],
    }).compileComponents();

    fixture = TestBed.createComponent(UiColorTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
