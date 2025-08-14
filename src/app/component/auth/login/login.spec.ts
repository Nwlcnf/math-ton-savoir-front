import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn()
    };
    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, CommonModule, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait naviguer vers /dashboard après un login réussi', () => {
    const mockResponse = { token: 'fake-jwt-token' };
    authServiceMock.login.mockReturnValue(of(mockResponse));
    component.email = 'test@example.com';
    component.password = '1234';

    component.login();

    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it("devrait afficher un message d'erreur en cas d'échec", () => {
    authServiceMock.login.mockReturnValue(throwError(() => new Error('Invalid')));
    component.email = 'wrong@example.com';
    component.password = 'wrong';

    component.login();

    expect(component.errorMessage).toBe('Email ou mot de passe incorrect.');
  });
});
