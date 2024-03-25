import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IuserCourse } from '../../Models/ICourse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCoursesService {

  private apiUrl = '/api/user-courses'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) {}

  getCart(): Observable<IuserCourse[]> {
    return this.http.get<IuserCourse[]>(`${this.apiUrl}/cart`);
  }

  getWishlist(): Observable<IuserCourse[]> {
    return this.http.get<IuserCourse[]>(`${this.apiUrl}/wishlist`);
  }

  addToCart(course: IuserCourse): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, course);
  }

  addToWishlist(course: IuserCourse): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist`, course);
  }}
