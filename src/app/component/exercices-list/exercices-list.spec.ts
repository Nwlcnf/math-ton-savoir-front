import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ExercicesListComponent } from './exercices-list';
import { ExerciceService } from '../../service/exercice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ExercicesListComponent (Jest)', () => {
  let component: ExercicesListComponent;
  let fixture: ComponentFixture<ExercicesListComponent>;
  let exerciceServiceMock: jest.Mocked<ExerciceService>;
  let routerMock: jest.Mocked<Router>;

  const mockExercices = [
    {
      idExercice: 1,
      typeExercice: 'QCM',
      enonceExercice: 'Quel est le résultat de 2+2 ?',
      correctionAuto: '4',
      difficulte: 'FACILE',
      estAutoCorrecte: true,
      lecon: {
        idLecon: 1,
        nomLecon: 'Addition',
        nomFichierPdf: 'addition.pdf',
        chapitre: {
          idChapitre: 1,
          nomChapitre: 'Opérations de base',
          classe: 'SIXIEME'
        }
      }
    },
    {
      idExercice: 2,
      typeExercice: 'Problème',
      enonceExercice: 'Résous x+3=5',
      correctionAuto: '2',
      difficulte: 'MOYEN',
      estAutoCorrecte: true,
      lecon: {
        idLecon: 2,
        nomLecon: 'Équations',
        nomFichierPdf: 'equations.pdf',
        chapitre: {
          idChapitre: 2,
          nomChapitre: 'Équations simples',
          classe: 'SIXIEME'
        }
      }
    }
  ];


  beforeEach(async () => {
    exerciceServiceMock = {
      getExercices: jest.fn()
    } as unknown as jest.Mocked<ExerciceService>;

    routerMock = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, MatProgressSpinnerModule, ExercicesListComponent],
      providers: [
        { provide: ExerciceService, useValue: exerciceServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExercicesListComponent);
    component = fixture.componentInstance;
  });

  it('charge les exercices au ngOnInit', () => {
    exerciceServiceMock.getExercices.mockReturnValue(of(mockExercices));

    component.ngOnInit();

    expect(exerciceServiceMock.getExercices).toHaveBeenCalled();
    expect(component.exercices).toEqual(mockExercices);
    expect(component.filteredExercices).toEqual(mockExercices);
    expect(component.loading).toBe(false);
  });

  it('gère une erreur de chargement', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    exerciceServiceMock.getExercices.mockReturnValue(throwError(() => new Error('Erreur serveur')));

    component.fetchExercices();

    expect(component.exercices).toEqual([]);
    expect(component.loading).toBe(false);
    expect(console.error).toHaveBeenCalled();
  });

  it('filtre les exercices par recherche', () => {
    component.exercices = mockExercices;
    component.searchTerm = 'addition';

    component.applyFilters();

    expect(component.filteredExercices.length).toBe(1);
    expect(component.filteredExercices[0].lecon.nomLecon).toBe('Addition');
  });

  it('filtre les exercices par type et difficulté', () => {
    component.exercices = mockExercices;
    component.selectedType = 'QCM';
    component.selectedDifficulte = 'FACILE';

    component.applyFilters();

    expect(component.filteredExercices.length).toBe(1);
    expect(component.filteredExercices[0].typeExercice).toBe('QCM');
  });

  it('toggleFilter modifie correctement les filtres', () => {
    component.exercices = mockExercices;

    component.toggleFilter('typeExercice', 'QCM');
    expect(component.selectedType).toBe('QCM');

    component.toggleFilter('typeExercice', 'QCM');
    expect(component.selectedType).toBeNull();
  });

  it('resetFilters remet tout à zéro', () => {
    component.exercices = mockExercices;
    component.searchTerm = 'test';
    component.selectedType = 'QCM';
    component.selectedDifficulte = 'FACILE';

    component.resetFilters();

    expect(component.searchTerm).toBe('');
    expect(component.selectedType).toBeNull();
    expect(component.selectedDifficulte).toBeNull();
    expect(component.filteredExercices).toEqual(mockExercices);
  });

  it('startExercice navigue vers la page exercice', () => {
    component.startExercice(1);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/exercice', 1]);
  });
});
