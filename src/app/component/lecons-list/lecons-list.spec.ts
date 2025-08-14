import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LeconsListComponent } from './lecons-list';
import { LeconService, Lecon } from '../../service/lecon.service';

describe('LeconsListComponent', () => {
  let component: LeconsListComponent;
  let fixture: ComponentFixture<LeconsListComponent>;
  let leconServiceMock: jest.Mocked<LeconService>;
  let routerMock: jest.Mocked<Router>;

  const mockLecons: Lecon[] = [
    {
      idLecon: 1,
      nomLecon: 'Introduction aux fractions',
      nomFichierPdf: 'fractions.pdf',
      chapitreId: 1,
      niveau: 'SIXIEME',
      description: 'Notions de base sur les fractions',
      pdfUrl: 'http://localhost:8080/api/lecons/1/pdf'
    },
    {
      idLecon: 2,
      nomLecon: 'Équations simples',
      nomFichierPdf: 'equations.pdf',
      chapitreId: 2,
      niveau: 'SIXIEME',
      description: 'Résoudre des équations simples',
      pdfUrl: 'http://localhost:8080/api/lecons/2/pdf'
    },
    {
      idLecon: 3,
      nomLecon: 'Géométrie de base',
      nomFichierPdf: 'geometrie.pdf',
      chapitreId: 3,
      niveau: 'CINQUIEME',
      description: 'Notions de géométrie plane',
      pdfUrl: 'http://localhost:8080/api/lecons/3/pdf'
    }
  ];

  beforeEach(async () => {
    leconServiceMock = {
      getLecons: jest.fn(),
      getLeconById: jest.fn(),
      getPdfByUrl: jest.fn()
    } as unknown as jest.Mocked<LeconService>;

    routerMock = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [LeconsListComponent],
      providers: [
        { provide: LeconService, useValue: leconServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeconsListComponent);
    component = fixture.componentInstance;
  });

  it('charge la liste des leçons au ngOnInit', () => {
    leconServiceMock.getLecons.mockReturnValue(of(mockLecons));

    component.ngOnInit();

    expect(leconServiceMock.getLecons).toHaveBeenCalled();
    expect(component.lecons).toEqual(mockLecons);
  });

  it('gère une erreur lors du chargement des leçons', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    leconServiceMock.getLecons.mockReturnValue(throwError(() => new Error('Erreur serveur')));

    component.ngOnInit();

    expect(component.lecons).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Erreur chargement leçons', expect.any(Error));
  });

  it('filtre les leçons par searchText', () => {
    component.lecons = mockLecons;
    component.searchText = 'fractions';

    expect(component.filteredLecons.length).toBe(1);
    expect(component.filteredLecons[0].nomLecon).toBe('Introduction aux fractions');
  });

  it('filtre les leçons par niveau', () => {
    component.lecons = mockLecons;
    component.selectedNiveau = 'SIXIEME';

    expect(component.filteredLecons.length).toBe(2);
    expect(component.filteredLecons.every(l => l.niveau === 'SIXIEME')).toBe(true);
  });

  it('toggleNiveau sélectionne ou désélectionne un niveau', () => {
    component.selectedNiveau = null;
    component.toggleNiveau('SIXIEME');
    expect(component.selectedNiveau).toBe('SIXIEME');

    component.toggleNiveau('SIXIEME');
    expect(component.selectedNiveau).toBeNull();
  });

  it('resetFilters réinitialise searchText et selectedNiveau', () => {
    component.searchText = 'test';
    component.selectedNiveau = 'SIXIEME';
    component.resetFilters();
    expect(component.searchText).toBe('');
    expect(component.selectedNiveau).toBeNull();
  });

  it('voirLecon navigue vers la bonne route', () => {
    component.voirLecon(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/lecon', 1]);
  });
});
