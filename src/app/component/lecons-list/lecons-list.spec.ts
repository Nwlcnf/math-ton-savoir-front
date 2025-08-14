import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeconsList } from './lecons-list';

describe('LeconsList', () => {
  let component: LeconsList;
  let fixture: ComponentFixture<LeconsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeconsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeconsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
