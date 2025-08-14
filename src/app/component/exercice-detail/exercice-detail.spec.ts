import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciceDetail } from './exercice-detail';

describe('ExerciceDetail', () => {
  let component: ExerciceDetail;
  let fixture: ComponentFixture<ExerciceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
