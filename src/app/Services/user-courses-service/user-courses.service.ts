import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCoursesService {

  private apiUrl = '/api/user-courses'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) {}

  getMyLearningCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCart(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart`);
  }

  getWishlist(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/wishlist`);
  }

  getWishlistForNav(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/wishlist`);
  }

  addToCart(course: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, course);
  }

  addToWishlist(course: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist`, course);
  }

}
