import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeconDetail } from './lecon-detail';

describe('LeconDetail', () => {
  let component: LeconDetail;
  let fixture: ComponentFixture<LeconDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeconDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeconDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
