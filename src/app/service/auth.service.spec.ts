import { TestBed } from '@angular/core/testing';
import { AuthService, RegisterRequest } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);

        localStorage.clear();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('devrait créer le service', () => {
        expect(service).toBeTruthy();
    });

    it('register() envoie un POST et récupère la réponse', () => {
        const mockData: RegisterRequest = {
            pseudo: 'Nawel',
            email: 'nawel@test.com',
            motDePasse: '123456',
            role: 'ELEVE',
            niveau: '6eme'
        };

        const mockResponse = { token: 'abcd1234' };

        service.register(mockData).subscribe(res => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/auth/register');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockData);

        req.flush(mockResponse);
    });

    it('login() envoie un POST et récupère la réponse', () => {
        const mockResponse = { token: 'abcd1234' };

        service.login('nawel@test.com', '123456').subscribe(res => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ email: 'nawel@test.com', motDePasse: '123456' });

        req.flush(mockResponse);
    });

    it('isLoggedIn() retourne true si token existe', () => {
        localStorage.setItem('token', 'abcd1234');
        expect(service.isLoggedIn()).toBe(true);
    });

    it('isLoggedIn() retourne false si token absent', () => {
        expect(service.isLoggedIn()).toBe(false);
    });

    it('logout() supprime le token', () => {
        localStorage.setItem('token', 'abcd1234');
        service.logout();
        expect(localStorage.getItem('token')).toBeNull();
    });
});
