import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExerciceService } from '../../service/exercice.service';

@Component({
  selector: 'app-exercices-list',
  standalone: true,
  templateUrl: './exercices-list.html',
  styleUrls: ['./exercices-list.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class ExercicesListComponent implements OnInit {

  exercices: any[] = [];
  filteredExercices: any[] = [];

  loading = true;

  searchTerm = '';
  selectedType: string | null = null;
  selectedDifficulte: string | null = null;

  types: string[] = ['QCM', 'Problème', 'Vrai/Faux']; // exemple
  difficultes: string[] = ['FACILE', 'MOYEN', 'DIFFICILE'];

  constructor(
      private exercicesService: ExerciceService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchExercices();
  }

  fetchExercices(): void {
    this.loading = true;
    this.exercicesService.getExercices().subscribe({
      next: (data) => {
        this.exercices = data || [];
        this.filteredExercices = [...this.exercices];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des exercices', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredExercices = this.exercices.filter(ex => {
      const matchSearch =
          !this.searchTerm ||
          ex.enonceExercice.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          ex.lecon?.nomLecon?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchType = !this.selectedType || ex.typeExercice === this.selectedType;
      const matchDiff = !this.selectedDifficulte || ex.difficulte === this.selectedDifficulte;

      return matchSearch && matchType && matchDiff;
    });
  }

  toggleFilter(filterType: 'typeExercice' | 'difficulte', value: string): void {
    if (filterType === 'typeExercice') {
      this.selectedType = this.selectedType === value ? null : value;
    } else if (filterType === 'difficulte') {
      this.selectedDifficulte = this.selectedDifficulte === value ? null : value;
    }
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = null;
    this.selectedDifficulte = null;
    this.filteredExercices = [...this.exercices];
  }

  startExercice(id: number): void {
    this.router.navigate(['/exercice', id]);
  }
}
