import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
    let interceptor: AuthInterceptor;

    beforeEach(() => {
        interceptor = new AuthInterceptor();
    });

    it('ajoute le header Authorization si token existe', (done) => {
        localStorage.setItem('token', 'fake-token');

        const req = new HttpRequest('GET', '/test');
        const next: HttpHandler = {
            handle: (request: HttpRequest<any>) => {
                expect(request.headers.get('Authorization')).toBe('Bearer fake-token');
                done();
                return of({} as HttpEvent<any>);
            }
        };

        interceptor.intercept(req, next);
    });

    it('ne modifie pas la requête si token absent', (done) => {
        localStorage.removeItem('token');

        const req = new HttpRequest('GET', '/test');
        const next: HttpHandler = {
            handle: (request: HttpRequest<any>) => {
                expect(request.headers.has('Authorization')).toBe(false);
                done();
                return of({} as HttpEvent<any>);
            }
        };

        interceptor.intercept(req, next);
    });
});
