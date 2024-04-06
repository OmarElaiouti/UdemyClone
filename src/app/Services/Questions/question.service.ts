import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IQuestion, UserProfile } from '../../Models/lesson';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {



  private apiUrl = 'https://your-api-url'; // Replace with your API URL

 
  constructor(private http: HttpClient) { }

  // Fetch questions for a specific course
  getQuestions(courseId: number): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${this.apiUrl}/courses/${courseId}/questions`);
  }

  addQuestion(newQuestion: string): Observable<any> {
    const url = 'your_api_endpoint_here';
    return this.http.post(url, { content: newQuestion });
  }

  updateQuestion(question: IQuestion): Observable<any> {
    return this.http.put(`${this.apiUrl}/questions/update`, question);
  }

  // Fetch user profile
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/user/profile`);
  }
}
