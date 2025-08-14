import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExerciceService, Exercice, Lecon, Chapitre } from './exercice.service';

describe('ExerciceService', () => {
    let service: ExerciceService;
    let httpMock: HttpTestingController;

    const mockChapitre: Chapitre = {
        idChapitre: 1,
        nomChapitre: 'Chapitre 1',
        classe: '6eme'
    };

    const mockLecon: Lecon = {
        idLecon: 10,
        nomLecon: 'Leçon 1',
        nomFichierPdf: 'lecon1.pdf',
        chapitre: mockChapitre
    };

    const mockExercice: Exercice = {
        idExercice: 100,
        typeExercice: 'QCM',
        enonceExercice: 'Enoncé test',
        correctionAuto: 'Correction test',
        difficulte: 'Facile',
        estAutoCorrecte: true,
        lecon: mockLecon
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ExerciceService]
        });

        service = TestBed.inject(ExerciceService);
        httpMock = TestBed.inject(HttpTestingController);

        localStorage.clear();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('getExercices() envoie une requête GET avec Authorization si token existe', () => {
        localStorage.setItem('token', 'fake-token');

        service.getExercices().subscribe(res => {
            expect(res).toEqual([mockExercice]);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/exercices');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

        req.flush([mockExercice]);
    });

    it('getExercices() envoie une requête GET sans Authorization si token absent', () => {
        service.getExercices().subscribe();

        const req = httpMock.expectOne('http://localhost:8080/api/exercices');
        expect(req.request.headers.has('Authorization')).toBe(false);

        req.flush([]);
    });

    it('getExerciceById() envoie une requête GET avec Authorization si token existe', () => {
        localStorage.setItem('token', 'fake-token');

        service.getExerciceById(100).subscribe(res => {
            expect(res).toEqual(mockExercice);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/exercices/100');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

        req.flush(mockExercice);
    });
});
