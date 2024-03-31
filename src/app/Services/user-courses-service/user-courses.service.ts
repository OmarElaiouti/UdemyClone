import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Icourse, Icourselong } from '../../Models/ICourse';
import { Icart } from '../../Models/icart';
import { CommunicationService } from '../communication-service/communication.service';

@Injectable({
  providedIn: 'root'
})
export class UserCoursesService {

  private apiUrl = 'http://localhost:5165'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient,private communication:CommunicationService) {}

  getMyLearningCourses(): Observable<Icourselong[]> {
    return this.http.get<Icourselong[]>(`${this.apiUrl}/api/Courses/enrolled-in`);
  }

  getCart(): Observable<Icart[]> {
    return this.http.get<Icart[]>(`${this.apiUrl}/api/Courses/courses-in-cart`);
  }

  getWishlist(): Observable<Icourselong[]> {
    return this.http.get<Icourselong[]>(`${this.apiUrl}/api/Courses/courses-in-wishlist`);

  }


  addToCart(id: number): Observable<Icourse> {
    // Make a POST request to the API endpoint with the request body
    return this.http.get<Icourse>(`${this.apiUrl}/api/Courses/add-course-to-cart/${id}`).pipe(
      tap((course: Icourse) => {
          // Announce the product added to the cart
          this.communication.announceProductAddedToCart(course);
      })
  );
};
  

  addToWishlist(id: number): Observable<Icourse> {


    return this.http.get<Icourse>(`${this.apiUrl}/api/Courses/addCourseToWishlist/${id}`).pipe(
      tap((course: Icourse) => {
          // Announce the product added to the cart
          this.communication.announceProductAddedToWishlist(course);
      }));
  }

  removeFromCart(id:number): Observable<any> {
    // Assuming you have an API endpoint to remove items from the cart
    return this.http.post<any>(`${this.apiUrl}`, id);
  }

  CompeleteCheckOut():Observable<any> {
    return this.http.post(`${this.apiUrl}/api/User/create-transaction`,{})
  }

}
