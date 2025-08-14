import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExerciceService } from '../../service/exercice.service';

@Component({
  selector: 'app-exercice-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, RouterLink, RouterLinkActive],
  templateUrl: './exercice-detail.html',
  styleUrls: ['./exercice-detail.scss']
})
export class ExerciceDetailComponent implements OnInit {

  exercice: any = null;
  loading = true;

  userAnswer = '';
  feedbackMessage = '';
  isCorrect: boolean | null = null;

  constructor(
      private route: ActivatedRoute,
      private exerciceService: ExerciceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.exerciceService.getExerciceById(id).subscribe({
        next: (data) => {
          this.exercice = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur lors du chargement de l’exercice', err);
          this.loading = false;
        }
      });
    }
  }

  checkAnswer(): void {
    if (!this.userAnswer.trim()) {
      this.feedbackMessage = 'Veuillez entrer une réponse.';
      this.isCorrect = null;
      return;
    }

    if (this.exercice.correctionAuto.includes(this.userAnswer.trim())) {
      this.feedbackMessage = '✅ Bonne réponse !';
      this.isCorrect = true;
    } else {
      this.feedbackMessage = `❌ Mauvaise réponse. ${this.exercice.correctionAuto}`;
      this.isCorrect = false;
    }
  }
}
