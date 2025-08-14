import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeconService, Lecon } from './lecon.service';

describe('LeconService', () => {
    let service: LeconService;
    let httpMock: HttpTestingController;

    const mockLecon: Lecon = {
        idLecon: 1,
        nomLecon: 'Leçon Test',
        nomFichierPdf: 'test.pdf',
        chapitreId: 10,
        niveau: '6eme',
        description: 'Description test',
        pdfUrl: 'url/test.pdf'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LeconService]
        });

        service = TestBed.inject(LeconService);
        httpMock = TestBed.inject(HttpTestingController);

        // Mock localStorage.getItem pour le token
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            return key === 'token' ? 'fake-token' : null;
        });
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('getLecons() envoie GET avec Authorization si token présent', () => {
        service.getLecons().subscribe(res => {
            expect(res).toEqual([mockLecon]);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/lecons');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

        req.flush([mockLecon]);
    });

    it('getLeconById() envoie GET avec Authorization si token présent', () => {
        service.getLeconById(1).subscribe(res => {
            expect(res).toEqual(mockLecon);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/lecons/1');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

        req.flush(mockLecon);
    });

    it('getPdfByUrl() récupère un Blob avec Authorization si token présent', () => {
        const mockBlob = new Blob(['pdf content'], { type: 'application/pdf' });

        service.getPdfByUrl(1).subscribe(res => {
            expect(res).toEqual(mockBlob);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/lecons/1/pdf');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

        req.flush(mockBlob);
    });

    it('getLecons() sans token n’ajoute pas Authorization', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

        service.getLecons().subscribe();

        const req = httpMock.expectOne('http://localhost:8080/api/lecons');
        expect(req.request.headers.has('Authorization')).toBe(false);

        req.flush([]);
    });
});
