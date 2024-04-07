import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IData, Idata, IinstructorCourse } from '../../Models/idata';
import { Observable } from 'rxjs';
import { Icoursecontent } from '../../Models/icoursecontent';
import { InstructorComponent } from '../../Component/instructor/instructor.component';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  private apiUrl = 'http://localhost:5165'; // Replace this with your API URL

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<IinstructorCourse> {
    return this.http.get<IinstructorCourse>(`${this.apiUrl}/api/InstructorDashboard/instructor-courses`);
  }

  getCourseById(courseId: number): Observable<IData> {
    return this.http.get<IData>(`${this.apiUrl}/api/InstructorDashboard/course/${courseId}`);
  }

  createCourse(course: Idata): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/InstructorDashboard/create-or-update-course`, course);
  }

  updateCourse(id: number, course: IData): Observable<IData> {
    return this.http.put<IData>(`${this.apiUrl}/api/InstructorDashboard/create-or-update-course`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/InstructorDashboard/delete-courses/${id}`);
  }

  InstructorQuestion(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/api/InstructorDashboard/check-instructor-profile`);
  }
}
