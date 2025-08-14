import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
    let interceptor: AuthInterceptor;
    let httpHandlerMock: jest.Mocked<HttpHandler>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthInterceptor]
        });
        interceptor = TestBed.inject(AuthInterceptor);
        httpHandlerMock = {
            handle: jest.fn().mockReturnValue(of(new HttpResponse({ status: 200 })))
        };
        localStorage.clear();
    });

    it('devrait être créé', () => {
        expect(interceptor).toBeTruthy();
    });

    it('ajoute le header Authorization si token existe', () => {
        localStorage.setItem('token', 'fake-token');
        const req = new HttpRequest('GET', '/test');

        interceptor.intercept(req, httpHandlerMock).subscribe(response => {
            expect(response).toBeTruthy();
        });

        // Récupère la requête interceptée
        const handledReq = httpHandlerMock.handle.mock.calls[0][0] as HttpRequest<any>;

        // Vérifie que le header Authorization existe et a la bonne valeur
        expect(handledReq.headers.has('Authorization')).toBe(true);
        expect(handledReq.headers.get('Authorization')).toBe('Bearer fake-token');
    });

    it('ne modifie pas la requête si token absent', () => {
        const req = new HttpRequest('GET', '/test');

        interceptor.intercept(req, httpHandlerMock).subscribe(response => {
            expect(response).toBeTruthy();
        });

        expect(httpHandlerMock.handle).toHaveBeenCalledWith(req);
    });
});
