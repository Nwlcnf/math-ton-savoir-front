import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';
import { AuthService } from '../../service/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let authServiceMock: jest.Mocked<AuthService>;
    let router: Router;

    beforeEach(async () => {
        authServiceMock = {
            isLoggedIn: jest.fn(),
            logout: jest.fn()
        } as unknown as jest.Mocked<AuthService>;

        await TestBed.configureTestingModule({
            imports: [NavbarComponent, RouterTestingModule],
            providers: [
                { provide: AuthService, useValue: authServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        jest.spyOn(router, 'navigate'); // spy sur la méthode navigate
        fixture.detectChanges();
    });

    it('devrait créer le composant', () => {
        expect(component).toBeTruthy();
    });

    it('retourne true si l’utilisateur est connecté', () => {
        authServiceMock.isLoggedIn.mockReturnValue(true);
        expect(component.isLoggedIn()).toBe(true);
        expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
    });

    it('retourne false si l’utilisateur n’est pas connecté', () => {
        authServiceMock.isLoggedIn.mockReturnValue(false);
        expect(component.isLoggedIn()).toBe(false);
        expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
    });

    it('déconnecte l’utilisateur et navigue vers /login', () => {
        component.logout();
        expect(authServiceMock.logout).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
});
