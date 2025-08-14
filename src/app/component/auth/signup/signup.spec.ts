import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with ELEVE role by default', () => {
    expect(component.role).toBe('ELEVE');
  });

  it('should set niveau to null when role is ENSEIGNANT', () => {
    component.role = 'ENSEIGNANT';
    component.niveau = 'TROISIEME';
    component.signup();
    expect(component.niveau).toBeNull();
  });

  it('should not call signup if passwords do not match', () => {
    spyOn(window, 'alert');
    component.password = '1234';
    component.confirmPassword = '5678';
    component.signup();
    expect(window.alert).toHaveBeenCalledWith('Les mots de passe ne correspondent pas');
  });

  it('should log the payload correctly when form is valid', () => {
    spyOn(console, 'log');
    component.pseudo = 'Nawel';
    component.email = 'nawel@test.fr';
    component.password = '1234';
    component.confirmPassword = '1234';
    component.role = 'ELEVE';
    component.niveau = 'TROISIEME';

    component.signup();

    expect(console.log).toHaveBeenCalledWith('Inscription :', {
      pseudo: 'Nawel',
      email: 'nawel@test.fr',
      motDePasse: '1234',
      role: 'ELEVE',
      niveau: 'TROISIEME'
    });
  });
});
