import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../../Models/lesson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Review2Service {


  private apiUrl = 'https://api.example.com'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews`);
  }

  postReview(review: Review): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, review);
  }
}
