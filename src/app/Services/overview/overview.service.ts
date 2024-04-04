import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourseOverview } from '../../Models/overview';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  private apiUrl = 'https://your-api-url'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getOverviewData(courseId: number): Observable<ICourseOverview> {
    return this.http.get<ICourseOverview>(`${this.apiUrl}/courses/${courseId}/overview`);
  }
}
