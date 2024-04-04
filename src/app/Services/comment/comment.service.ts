import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../../Models/lesson';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'https://your-api-url'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getComments(courseId: Number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.apiUrl}/courses/${courseId}/comments`);
  }

  addComment(comment: IComment): Observable<any> {
    return this.http.post(`${this.apiUrl}/courses/${comment.courseId}/comments`, comment);
  }

  deleteComment(courseId: Number, commentId: Number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${courseId}/comments/${commentId}`);
  }
}
