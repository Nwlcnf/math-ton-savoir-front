import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lecon {
  idLecon: number;
  nomLecon: string;
  nomFichierPdf: string;
  chapitreId: number;
  niveau: string | null;
  description: string | null;
  pdfUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeconService {
  private apiUrl = 'http://localhost:8080/api/lecons';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders(
      token ? { Authorization: `Bearer ${token}` } : {}
    );
  }

  getLecons(): Observable<Lecon[]> {
    return this.http.get<Lecon[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getLeconById(id: number): Observable<Lecon> {
    return this.http.get<Lecon>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getPdfByUrl(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/${id}/pdf`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob' as 'json' // hack TypeScript pour blob
    });
  }
}
