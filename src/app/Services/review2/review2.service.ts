import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review, ReviewData } from '../../Models/lesson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Review2Service {

  private apiUrl = 'api/reviews'; // Assuming your API endpoint is 'api/reviews'

  constructor(private http: HttpClient) { }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  submitReview(reviewData: ReviewData): Observable<Review> {
    // Assuming your backend API autogenerates the id and returns the full review after saving
    return this.http.post<Review>(this.apiUrl, reviewData);
  }

  getReview(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }
}
