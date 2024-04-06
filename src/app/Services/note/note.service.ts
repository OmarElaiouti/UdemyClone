import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INote } from '../../Models/lesson';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://your-backend-url/api/notes'; // Replace this with your backend API URL

  constructor(private http: HttpClient) { }

  getNotesForVideo(videoId: number): Observable<INote[]> {
    const url = `${this.apiUrl}/video/${videoId}`;
    return this.http.get<INote[]>(url);
  }

  addNoteToVideo(videoId: number, note: INote): Observable<any> {
    const url = `${this.apiUrl}/video/${videoId}/add`;
    return this.http.post<any>(url, note);
  }
}
