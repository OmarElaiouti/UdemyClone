import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnnouncement, IComment, ICourseSectionsData, Review } from '../../Models/lesson';
import { ICourseOverview } from '../../Models/overview';
import { ILessonStatus } from '../../Models/ILessonStatus';

@Injectable({
  providedIn: 'root'
})
export class VideoLessonService {
  apiUrl = 'http://localhost:5165/'
  constructor(private http:HttpClient){}

  FillSections(courseId: number):Observable<ICourseSectionsData>{
    return this.http.get<ICourseSectionsData>(`${this.apiUrl}/api/course-data/api/course-sections/${courseId}`)
  }

  getAnnouncements(courseId: number): Observable<IAnnouncement[]> {
    return this.http.get<IAnnouncement[]>(`${this.apiUrl}/api/course-data/api/course-announcements/${courseId}`);
  }
  
  FillReviews(courseId:number):Observable<Review[]>{
    return this.http.get<Review[]>(`${this.apiUrl}/api/course-data/api/course-sections/${courseId}`)
  }

  
  GetStudentReviews(courseId:number):Observable<Review>{
    return this.http.get<Review>(`${this.apiUrl}/api/course-data/api/course-sections/${courseId}`)
  }

  SetStudentReviews(courseId:number,review:Review):Observable<Review>{
    return this.http.post<Review>(`${this.apiUrl}/api/course-data/api/course-sections/${courseId}`,review)
  }

  GetComments(courseId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.apiUrl}/api/course-data/api/${courseId}/get-q&a`);
  }

  SetStudentComment(courseId: number,comment:IComment):Observable<any>{      // Assuming your API endpoint for updating a question is '/questions/update'
      return this.http.put<any>(`${this.apiUrl}/api/course-data/api/${courseId}/update-q&a`, comment);
    }

    getOverviewData(courseId: number): Observable<ICourseOverview> {
      return this.http.get<ICourseOverview>(`${this.apiUrl}/api/course-data/api/${courseId}/get-overview`);
    }
  

  SetLesoonsStatus(courseId: number,LessonStatus:ILessonStatus[]):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/api/course-data/api/${courseId}/set-student-lessons-status`,LessonStatus)
  }

}
