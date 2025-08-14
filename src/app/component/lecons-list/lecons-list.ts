import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeconService, Lecon } from '../../service/lecon.service';

@Component({
  selector: 'app-lecons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lecons-list.html',
  styleUrls: ['./lecons-list.scss']
})
export class LeconsListComponent implements OnInit {
  searchText = '';

  niveaux = ['6eme', '5eme', '4eme', '3eme'];
  selectedNiveau: string | null = null;

  lecons: Lecon[] = [];

  constructor(private router: Router, private leconService: LeconService) {}

  ngOnInit(): void {
    this.leconService.getLecons().subscribe({
      next: (data) => this.lecons = data,
      error: (err) => console.error('Erreur chargement leçons', err)
    });
  }

  get filteredLecons() {
    return this.lecons.filter(l => {
      const matchesSearch = l.nomLecon.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesNiveau = this.selectedNiveau ? l.niveau === this.selectedNiveau : true;
      return matchesSearch && matchesNiveau;
    });
  }

  toggleNiveau(niveau: string) {
    this.selectedNiveau = this.selectedNiveau === niveau ? null : niveau;
  }

  voirLecon(idLecon: number) {
    this.router.navigate(['/lecon', idLecon]);
  }

  resetFilters() {
    this.selectedNiveau = null;
    this.searchText = '';
  }
}
