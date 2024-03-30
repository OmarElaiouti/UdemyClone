import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsService {
  private apiUrl = '/api/user-courses';

  constructor(private http:HttpClient) { }
  getcourseDetails(courseId:number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/coursedetails?courseId=${courseId}`);
  }

  getObjectives(courseId:number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/coursedetails?courseId=${courseId}`);
  }

  getContent(courseId:number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/coursedetails?courseId=${courseId}`);
  }
}
