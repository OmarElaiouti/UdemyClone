import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INote } from '../../Models/lesson';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'https://mocki.io/v1/5a88ca9b-691c-4937-98c9-ae9a7c28fe32'; // Replace with your API URL

  constructor(private http: HttpClient) { }

 getNotes(videoId: Number): Observable<INote[]> {
    return this.http.get<INote[]>(`${this.apiUrl}/videos/${videoId}/notes`);
  }

  addNote(videoId: Number, noteContent: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/videos/${videoId}/notes`, { content: noteContent });
  }

  deleteNote(videoId: Number, noteId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/videos/${videoId}/notes/${noteId}`);
  }

}
