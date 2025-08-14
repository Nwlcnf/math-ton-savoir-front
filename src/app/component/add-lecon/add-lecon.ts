import { Component, OnInit, OnDestroy } from '@angular/core';
import {Editor, NgxEditorComponent} from 'ngx-editor';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-lecon',
  templateUrl: './add-lecon.html',
  imports: [
    FormsModule,
    NgxEditorComponent
  ],
  styleUrls: ['./add-lecon.scss']
})
export class AddLeconComponent implements OnInit, OnDestroy {
  editor!: Editor;

  lecon = {
    nomLecon: '',
    contenuLecon: '',
    chapitreId: null
  };

  chapitres = [
    { id: 1, nom: 'Nombres entiers' },
    { id: 2, nom: 'Fractions' },
    { id: 3, nom: 'Géométrie' }
  ];

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ajouterLecon(): void {
    const confirmation = confirm(
      `Confirmer l'ajout de la leçon "${this.lecon.nomLecon}" ?`
    );

    if (!confirmation) return;

    console.log('Leçon ajoutée (mock) :', this.lecon);
    alert(`✅ La leçon "${this.lecon.nomLecon}" a été ajoutée !`);
    this.resetForm();
  }

  resetForm(): void {
    this.lecon = {
      nomLecon: '',
      contenuLecon: '',
      chapitreId: null
    };
  }
}
