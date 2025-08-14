import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  userName = 'Nawel';

  progressionPercent = 45;

  stats = [
    {
      icon: '📝',
      title: 'Exercices réalisés',
      value: 123,
      subtitle: 'Depuis ton inscription'
    },
    {
      icon: '⏰',
      title: 'Heures d’étude',
      value: 56,
      subtitle: 'Total cumulé'
    },
    {
      icon: '⭐',
      title: 'Moyenne générale',
      value: 14.8,
      subtitle: 'Sur 20'
    },
    {
      icon: '📈',
      title: 'Progrès du mois',
      value: '12%',
      subtitle: 'Comparé au mois dernier'
    }
  ];

  quickAccess = [
    { icon: '📚', label: 'Leçons', route: '/lecons' },
    { icon: '📝', label: 'Exercices', route: '/exercices' },
    { icon: '📅', label: 'Devoirs', route: '/devoirs' },
    { icon: '📊', label: 'Suivi', route: '/suivi' }
  ];

  notifications = [
    'Rappel : Devoir de maths en retard !',
    'Message enseignant : Bravo pour ta progression.'
  ];

  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
