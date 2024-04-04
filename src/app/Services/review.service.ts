import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://example.com/api/reviews'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  addReview(review: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, review);
  }

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }}
