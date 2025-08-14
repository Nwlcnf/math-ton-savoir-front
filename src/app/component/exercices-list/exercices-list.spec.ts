import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesList } from './exercices-list';

describe('ExercicesList', () => {
  let component: ExercicesList;
  let fixture: ComponentFixture<ExercicesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercicesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
