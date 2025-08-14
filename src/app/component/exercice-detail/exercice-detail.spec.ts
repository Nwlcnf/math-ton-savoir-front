import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ExerciceDetailComponent } from './exercice-detail';
import { ExerciceService, Exercice } from '../../service/exercice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ExerciceDetailComponent (Jest)', () => {
  let component: ExerciceDetailComponent;
  let fixture: ComponentFixture<ExerciceDetailComponent>;
  let exerciceServiceMock: jest.Mocked<ExerciceService>;

  const mockExercice: Exercice = {
    idExercice: 1,
    typeExercice: 'QCM',
    enonceExercice: 'Quel est le résultat de 7 × 8 ?',
    correctionAuto: 'Le résultat est 56.',
    estAutoCorrecte: true,
    difficulte: 'FACILE',
    lecon: {
      idLecon: 1,
      nomLecon: 'Multiplication',
      nomFichierPdf: 'multiplication.pdf',
      chapitre: {
        idChapitre: 1,
        nomChapitre: 'Opérations de base',
        classe: 'SIXIEME'
      }
    }
  };

  beforeEach(async () => {
    const serviceMock = {
      getExerciceById: jest.fn()
    } as unknown as jest.Mocked<ExerciceService>;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        ExerciceDetailComponent
      ],
      providers: [
        { provide: ExerciceService, useValue: serviceMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', '1']]) } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceDetailComponent);
    component = fixture.componentInstance;
    exerciceServiceMock = TestBed.inject(ExerciceService) as jest.Mocked<ExerciceService>;
  });

  it('charge un exercice au ngOnInit', () => {
    exerciceServiceMock.getExerciceById.mockReturnValue(of(mockExercice));

    component.ngOnInit();

    expect(exerciceServiceMock.getExerciceById).toHaveBeenCalledWith(1);
    expect(component.exercice).toEqual(mockExercice);
    expect(component.loading).toBe(false);
  });

  it('gère une erreur lors du chargement', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    exerciceServiceMock.getExerciceById.mockReturnValue(throwError(() => new Error('Erreur serveur')));

    component.ngOnInit();

    expect(component.exercice).toBeNull();
    expect(component.loading).toBe(false);
    expect(console.error).toHaveBeenCalled();
  });

  it('affiche un message si réponse vide', () => {
    component.exercice = mockExercice;
    component.userAnswer = '';
    component.checkAnswer();

    expect(component.feedbackMessage).toBe('Veuillez entrer une réponse.');
    expect(component.isCorrect).toBeNull();
  });

  it('valide une bonne réponse', () => {
    component.exercice = mockExercice;
    component.userAnswer = '56';
    component.checkAnswer();

    expect(component.feedbackMessage).toBe('✅ Bonne réponse !');
    expect(component.isCorrect).toBe(true);
  });

  it('indique une mauvaise réponse', () => {
    component.exercice = mockExercice;
    component.userAnswer = '60';
    component.checkAnswer();

    expect(component.feedbackMessage).toContain('❌ Mauvaise réponse.');
    expect(component.isCorrect).toBe(false);
  });
});
