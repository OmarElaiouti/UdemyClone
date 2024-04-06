import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IQuestion, UserProfile } from '../../Models/lesson';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // private apiUrl = 'https://your-api-url'; // Replace with your API URL

  // constructor(private http: HttpClient) { }

  // getQuestions(courseId: Number): Observable<IQuestion[]> {
  //   return this.http.get<IQuestion[]>(`${this.apiUrl}/courses/${courseId}/questions`);
  // }

  // askQuestion(question: IQuestion): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/courses/${question.courseId}/questions`, question);
  // }

  // deleteQuestion(courseId: Number, questionId: Number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/courses/${courseId}/questions/${questionId}`);
  // }

  private apiUrl = 'https://your-api-url'; // Replace with your API URL

 
  constructor(private http: HttpClient) { }

  // Fetch questions for a specific course
  getQuestions(courseId: number): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${this.apiUrl}/courses/${courseId}/questions`);
  }

  // Update a question
  updateQuestion(question: IQuestion): Observable<any> {
    // Assuming your API endpoint for updating a question is '/questions/update'
    return this.http.put(`${this.apiUrl}/questions/update`, question);
  }

  // Fetch user profile
  getUserProfile(): Observable<UserProfile> {
    // Assuming the API endpoint for fetching user profile is '/user/profile'
    return this.http.get<UserProfile>(`${this.apiUrl}/user/profile`);
  }
}
