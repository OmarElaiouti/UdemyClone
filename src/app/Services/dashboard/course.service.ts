import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IData } from '../../Models/idata';
import { Observable } from 'rxjs';
import { Icoursecontent } from '../../Models/icoursecontent';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  private apiUrl = 'http://your-api-url'; // Replace this with your API URL

  constructor(private http: HttpClient) { }

  getAllCourses(instructorId:number): Observable<Icoursecontent> {
    return this.http.get<Icoursecontent>(`${this.apiUrl}/instructorCourse?instructorId=${instructorId}`);
  }

  getCourseById(courseId: number): Observable<IData> {
    return this.http.get<IData>(`${this.apiUrl}/courses/${courseId}`);
  }

  createCourse(course: IData): Observable<IData> {
    return this.http.post<IData>(`${this.apiUrl}/courses`, course);
  }

  updateCourse(id: number, course: IData): Observable<IData> {
    return this.http.put<IData>(`${this.apiUrl}/courses/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }
}
