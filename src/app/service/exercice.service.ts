import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chapitre {
    idChapitre: number;
    nomChapitre: string;
    classe: string;
}

export interface Lecon {
    idLecon: number;
    nomLecon: string;
    nomFichierPdf: string;
    chapitre: Chapitre;
}

export interface Exercice {
    idExercice: number;
    typeExercice: string;
    enonceExercice: string;
    correctionAuto: string;
    difficulte: string;
    estAutoCorrecte: boolean;
    lecon: Lecon;
}

@Injectable({
    providedIn: 'root'
})
export class ExerciceService {
    private apiUrl = 'http://localhost:8080/api/exercices';

    constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders(
            token ? { Authorization: `Bearer ${token}` } : {}
        );
    }

    getExercices(): Observable<Exercice[]> {
        return this.http.get<Exercice[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders() });
    }
    getExerciceById(id: number): Observable<Exercice> {
        return this.http.get<Exercice>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }
}
