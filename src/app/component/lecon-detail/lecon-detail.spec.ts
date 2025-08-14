import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LeconDetailComponent } from './lecon-detail';
import { LeconService, Lecon } from '../../service/lecon.service';

describe('LeconDetailComponent', () => {
  let component: LeconDetailComponent;
  let fixture: ComponentFixture<LeconDetailComponent>;
  let leconServiceMock: jest.Mocked<LeconService>;

  const mockLecon: Lecon = {
    idLecon: 1,
    nomLecon: 'Introduction aux fractions',
    nomFichierPdf: 'fractions.pdf',
    chapitreId: 1,
    niveau: 'SIXIEME',
    description: 'Notions de base sur les fractions',
    pdfUrl: 'http://localhost:8080/api/lecons/1/pdf'
  };

  beforeEach(async () => {
    leconServiceMock = {
      getLeconById: jest.fn(),
      getPdfByUrl: jest.fn(),
      getLecons: jest.fn()
    } as unknown as jest.Mocked<LeconService>;

    await TestBed.configureTestingModule({
      imports: [LeconDetailComponent],
      providers: [
        { provide: LeconService, useValue: leconServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', '1']]) } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeconDetailComponent);
    component = fixture.componentInstance;

    // mock de URL.createObjectURL
    global.URL.createObjectURL = jest.fn().mockReturnValue('blob:fake-url');
  });

  it('charge la leçon et le PDF au ngOnInit', () => {
    const fakeBlob = new Blob(['pdf content'], { type: 'application/pdf' });

    leconServiceMock.getLeconById.mockReturnValue(of(mockLecon));
    leconServiceMock.getPdfByUrl.mockReturnValue(of(fakeBlob));

    component.ngOnInit();

    expect(leconServiceMock.getLeconById).toHaveBeenCalledWith(1);
    expect(leconServiceMock.getPdfByUrl).toHaveBeenCalledWith(1);
    expect(component.lecon).toEqual(mockLecon);
    expect(component.pdfUrl).toContain('blob:');
    expect(component.isLoading).toBe(false);
  });

  it('ne fait rien si l’id est invalide', () => {
    (TestBed.inject(ActivatedRoute) as any).snapshot.paramMap = new Map([['id', '']]);

    component.ngOnInit();

    expect(leconServiceMock.getLeconById).not.toHaveBeenCalled();
    expect(component.lecon).toBeNull();
    expect(component.pdfUrl).toBeNull();
  });
});
