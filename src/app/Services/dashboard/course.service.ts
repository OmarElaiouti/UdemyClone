import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IData, Idata } from '../../Models/idata';
import { Observable } from 'rxjs';
import { Icoursecontent } from '../../Models/icoursecontent';
import { InstructorComponent } from '../../Component/instructor/instructor.component';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  private apiUrl = 'http://your-api-url'; // Replace this with your API URL

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Icoursecontent> {
    return this.http.get<Icoursecontent>(`${this.apiUrl}/instructorCourse`);
  }

  getCourseById(courseId: number): Observable<IData> {
    return this.http.get<IData>(`${this.apiUrl}/courses/${courseId}`);
  }

  createCourse(course: Idata): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses`, course);
  }

  updateCourse(id: number, course: IData): Observable<IData> {
    return this.http.put<IData>(`${this.apiUrl}/courses/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }

  InstructorQuestion(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/instructor/${id}`);
  }
}
