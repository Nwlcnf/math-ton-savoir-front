import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup';
import { AuthService, RegisterRequest } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    const authMock = { register: jest.fn() } as unknown as jest.Mocked<AuthService>;
    const routerSpy = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, SignupComponent],
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authServiceMock = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    routerMock = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('emailValid() retourne true pour un email correct', () => {
    component.email = 'test@example.com';
    expect(component.emailValid()).toBe(true);
  });

  it('emailValid() retourne false pour un email incorrect', () => {
    component.email = 'invalid-email';
    expect(component.emailValid()).toBe(false);
  });

  it('passwordIsStrong() retourne true pour mot de passe fort', () => {
    component.password = 'Abc123$%';
    expect(component.passwordIsStrong()).toBe(true);
  });

  it('passwordIsStrong() retourne false pour mot de passe faible', () => {
    component.password = 'abc';
    expect(component.passwordIsStrong()).toBe(false);
  });

  it('getPseudoError() retourne null pour pseudo valide', () => {
    component.pseudo = 'validPseudo';
    expect(component.getPseudoError()).toBeNull();
  });

  it('getPseudoError() détecte pseudo trop court', () => {
    component.pseudo = 'ab';
    expect(component.getPseudoError()).toBe('Le pseudo doit faire au moins 3 caractères.');
  });

  it('getPseudoError() détecte espace dans pseudo', () => {
    component.pseudo = 'pseudo test';
    expect(component.getPseudoError()).toBe('Le pseudo ne doit pas contenir d’espace.');
  });

  it('getPseudoError() détecte caractères invalides', () => {
    component.pseudo = 'pseudo@';
    expect(component.getPseudoError()).toBe('Le pseudo contient des caractères non autorisés (@, #, %, é ...).');
  });

  it('signup() alerte si mot de passe faible', () => {
    component.password = 'abc';
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.signup();
    expect(alertSpy).toHaveBeenCalledWith('Mot de passe trop faible.');
    alertSpy.mockRestore();
  });

  it('signup() alerte si email invalide', () => {
    component.password = 'Abc123$%';
    component.email = 'invalid';
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.signup();
    expect(alertSpy).toHaveBeenCalledWith('Adresse email invalide.');
    alertSpy.mockRestore();
  });

  it('signup() alerte si mots de passe ne correspondent pas', () => {
    component.password = 'Abc123$%';
    component.confirmPassword = 'Mismatch123!';
    component.email = 'test@example.com';
    component.role = 'ELEVE';
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.signup();
    expect(alertSpy).toHaveBeenCalledWith('Les mots de passe ne correspondent pas.');
    alertSpy.mockRestore();
  });

  it('signup() alerte si rôle non sélectionné', () => {
    component.password = 'Abc123$%';
    component.confirmPassword = 'Abc123$%';
    component.email = 'test@example.com';
    component.role = '';
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.signup();
    expect(alertSpy).toHaveBeenCalledWith('Veuillez sélectionner un rôle.');
    alertSpy.mockRestore();
  });

  it('signup() appelle authService.register et navigue sur succès', () => {
    component.password = 'Abc123$%';
    component.confirmPassword = 'Abc123$%';
    component.email = 'test@example.com';
    component.role = 'ELEVE';
    component.pseudo = 'PseudoTest';
    component.niveau = 'SIXIEME';

    authServiceMock.register.mockReturnValue(of({ token: 'fake-token' }));

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    component.signup();

    expect(authServiceMock.register).toHaveBeenCalledWith({
      pseudo: 'PseudoTest',
      email: 'test@example.com',
      motDePasse: 'Abc123$%',
      role: 'ELEVE',
      niveau: 'SIXIEME'
    });
    expect(localStorage.getItem('token')).toBe('fake-token');
    expect(alertSpy).toHaveBeenCalledWith('Inscription réussie !');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);

    alertSpy.mockRestore();
  });

  it('signup() gère erreur d’inscription', () => {
    component.password = 'Abc123$%';
    component.confirmPassword = 'Abc123$%';
    component.email = 'test@example.com';
    component.role = 'ELEVE';
    component.pseudo = 'PseudoTest';
    component.niveau = 'SIXIEME';

    authServiceMock.register.mockReturnValue(throwError(() => new Error('Erreur')));

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    component.signup();

    expect(alertSpy).toHaveBeenCalledWith("Échec de l'inscription. Vérifiez vos informations.");
    expect(consoleSpy).toHaveBeenCalled();

    alertSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
