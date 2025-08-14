import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-exercices-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './exercices-list.html',
  styleUrls: ['./exercices-list.scss']
})
export class ExercicesListComponent {
  searchText = '';
  niveaux = ['6e', '5e', '4e', '3e'];
  difficultes = ['Facile', 'Moyen', 'Difficile'];
  types = ['QCM', 'Problème', 'Calcul'];

  selectedNiveau: string | null = null;
  selectedDifficulte: string | null = null;
  selectedType: string | null = null;

  exercices = [
    {
      id: 1,
      titre: 'Calcul mental rapide',
      description: 'Addition et soustraction de nombres simples.',
      niveau: '6e',
      difficulte: 'Facile',
      type: 'Calcul',
      statut: 'non fait'
    },
    {
      id: 2,
      titre: 'Problème de proportionnalité',
      description: 'Résoudre un problème avec tableau de proportionnalité.',
      niveau: '4e',
      difficulte: 'Moyen',
      type: 'Problème',
      statut: 'en cours'
    },
    {
      id: 3,
      titre: 'QCM sur les triangles',
      description: 'Choisir la bonne réponse parmi 4 propositions.',
      niveau: '5e',
      difficulte: 'Difficile',
      type: 'QCM',
      statut: 'réussi'
    }
  ];

  constructor(private router: Router) {}

  get filteredExercices() {
    return this.exercices.filter(e => {
      const matchesSearch = e.titre.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesNiveau = this.selectedNiveau ? e.niveau === this.selectedNiveau : true;
      const matchesDifficulte = this.selectedDifficulte ? e.difficulte === this.selectedDifficulte : true;
      const matchesType = this.selectedType ? e.type === this.selectedType : true;
      return matchesSearch && matchesNiveau && matchesDifficulte && matchesType;
    });
  }

  toggleFilter(filterType: string, value: string) {
    switch (filterType) {
      case 'niveau':
        this.selectedNiveau = this.selectedNiveau === value ? null : value;
        break;
      case 'difficulte':
        this.selectedDifficulte = this.selectedDifficulte === value ? null : value;
        break;
      case 'type':
        this.selectedType = this.selectedType === value ? null : value;
        break;
    }
  }

  getStatutColor(statut: string): string {
    switch (statut) {
      case 'réussi': return 'green';
      case 'en cours': return 'orange';
      default: return 'red';
    }
  }

  resetFilters() {
    this.selectedNiveau = null;
    this.selectedDifficulte = null;
    this.selectedType = null;
    this.searchText = '';
  }

  commencer(id: number) {
    this.router.navigate(['/exercice', id]);
  }
}
