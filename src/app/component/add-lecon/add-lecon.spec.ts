import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLecon } from './add-lecon';

describe('AddLecon', () => {
  let component: AddLecon;
  let fixture: ComponentFixture<AddLecon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLecon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLecon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
