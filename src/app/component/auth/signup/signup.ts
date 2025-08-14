import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, RegisterRequest } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class SignupComponent {

  constructor(private authService: AuthService, private router: Router) {}

  pseudo = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = '';
  niveau: string | null = null;

  niveaux = [
    { value: 'SIXIEME', label: '6ème' },
    { value: 'CINQUIEME', label: '5ème' },
    { value: 'QUATRIEME', label: '4ème' },
    { value: 'TROISIEME', label: '3ème' }
  ];

  signup() {
    if (!this.passwordIsStrong()) {
      alert('Mot de passe trop faible.');
      return;
    }

    if (!this.emailValid()) {
      alert('Adresse email invalide.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!this.role) {
      alert('Veuillez sélectionner un rôle.');
      return;
    }

    const userData: RegisterRequest = {
      pseudo: this.pseudo,
      email: this.email,
      motDePasse: this.password,
      role: this.role,
      niveau: this.role === 'ELEVE' ? this.niveau : null
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        alert('Inscription réussie !');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erreur d’inscription:', err);
        alert("Échec de l'inscription. Vérifiez vos informations.");
      }
    });
  }

  emailValid(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

  passwordIsStrong(): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(this.password);
  }

  getPseudoError(): string | null {
    if (!this.pseudo) return null;
    if (this.pseudo.length < 3) return 'Le pseudo doit faire au moins 3 caractères.';
    if (/\s/.test(this.pseudo)) return 'Le pseudo ne doit pas contenir d’espace.';
    if (!/^[a-zA-Z0-9_-]+$/.test(this.pseudo)) return 'Le pseudo contient des caractères non autorisés (@, #, %, é ...).';
    return null;
  }
}
