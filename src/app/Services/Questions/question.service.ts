import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestion } from '../../Models/lesson';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'https://your-api-url'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getQuestions(courseId: Number): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${this.apiUrl}/courses/${courseId}/questions`);
  }

  askQuestion(question: IQuestion): Observable<any> {
    return this.http.post(`${this.apiUrl}/courses/${question.courseId}/questions`, question);
  }

  deleteQuestion(courseId: Number, questionId: Number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${courseId}/questions/${questionId}`);
  }}
