import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ione } from '../../Models/ione';
import { Itwo } from '../../Models/itwo';
import { Ifour } from '../../Models/ifour';
import { Icollaps } from '../../Models/icollaps';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsService {
  private apiUrl = '/api/user-courses';

  constructor(private http:HttpClient) { }
  getcourseDetails(courseId:number): Observable<Ione> {
    return this.http.get<Ione>(`${this.apiUrl}/coursedetails?courseId=${courseId}`);
  }

  getInstructor(courseId:number): Observable<Itwo> {
    return this.http.get<Itwo>(`${this.apiUrl}/coursedetails?courseId=${courseId}`);
  }

  getFeature(courseId:number): Observable<Ifour> {
    return this.http.get<Ifour>(`${this.apiUrl}/coursedetails?courseId=${courseId}`);
  }

  getSection(courseId:number): Observable<Icollaps> {
    return this.http.get<Icollaps>(`${this.apiUrl}/coursedetails?courseId=${courseId}`);
  }
}
