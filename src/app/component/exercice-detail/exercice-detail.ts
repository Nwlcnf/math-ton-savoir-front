import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-exercice-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './exercice-detail.html',
  styleUrls: ['./exercice-detail.scss']
})
export class ExerciceDetailComponent {
  exercice = {
    id: 1,
    titre: 'Résous cette équation',
    enonce: 'Trouve la valeur de x dans l’équation : 2x + 3 = 11',
    type: 'TEXTE', // 'QCM', 'TEXTE', 'DESSIN'
    options: ['4', '6', '5'],
    solution: '4'
  };

  currentIndex = 2;
  total = 10;

  reponse: string = '';
  feedback: string = '';
  estCorrect: boolean = false;
  afficherReessayer = false;

  valider() {
    this.estCorrect = this.reponse?.toString().trim() === this.exercice.solution;
    this.feedback = this.estCorrect
      ? '✅ Bonne réponse ! Bravo.'
      : '❌ Mauvaise réponse. La bonne réponse était : ' + this.exercice.solution;
    this.afficherReessayer = !this.estCorrect;
  }

  reessayer() {
    this.reponse = '';
    this.feedback = '';
    this.afficherReessayer = false;
  }

  suivant() {
    // rediriger ou charger un autre exercice
  }

  precedent() {
    // rediriger ou charger l'exercice précédent
  }
}
