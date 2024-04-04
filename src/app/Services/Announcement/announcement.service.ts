import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnnouncement } from '../../Models/lesson';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private apiUrl = 'https://your-api-url'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getAnnouncements(courseId: number): Observable<IAnnouncement[]> {
    return this.http.get<IAnnouncement[]>(`${this.apiUrl}/courses/${courseId}/announcements`);
  }

  // postAnnouncement(announcement: IAnnouncement): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/courses/${announcement.courseId}/announcements`, announcement);
  // }

  deleteAnnouncement(courseId: number, announcementId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${courseId}/announcements/${announcementId}`);
  }




   }