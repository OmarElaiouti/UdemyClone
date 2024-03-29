import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IcoursesMylearning } from '../../Models/ICourse';

@Injectable({
  providedIn: 'root'
})
export class UserCoursesService {

  private apiUrl = '/api/user-courses'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) {}

  getMyLearningCourses(): Observable<any[]> {
    return this.http.get<IcoursesMylearning[]>(this.apiUrl);
  }

  getCart(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart`);
  }

  getWishlist(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/wishlist`);
  }


  addToCart(id: number): Observable<any> {
    // Create a request body object containing the course ID
    const requestBody = { courseId: id };
  
    // Make a POST request to the API endpoint with the request body
    return this.http.post(`${this.apiUrl}/cart`, requestBody);
  }

  addToWishlist(id: number): Observable<any> {

    const requestBody = { courseId: id };

    return this.http.post(`${this.apiUrl}/wishlist`, requestBody);
  }

}
