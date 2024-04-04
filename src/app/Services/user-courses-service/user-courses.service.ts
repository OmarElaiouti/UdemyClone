import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Icourse, Icourselong } from '../../Models/ICourse';
import { Icart } from '../../Models/icart';
import { NavRefreshService } from '../nav-refresh-service/nav-refresh.service';

@Injectable({
  providedIn: 'root'
})
export class UserCoursesService {
  

  private apiUrl = 'http://localhost:5165'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient,private navbarRefreshService:NavRefreshService) {}

  getMyLearningCourses(): Observable<Icourselong[]> {
    return this.http.get<Icourselong[]>(`${this.apiUrl}/api/Courses/enrolled-in`);
  }

  getCart(): Observable<Icart[]> {
    return this.http.get<Icart[]>(`${this.apiUrl}/api/Courses/courses-in-cart`).pipe(
      tap((courses: Icart[]) => {
        // Announce the product added to the cart
        this.navbarRefreshService.refreshNavbar();
      })
    );
  }

  getAnonymousCart(): Observable<Icart[]> {
    const cartItems: number[] = JSON.parse(localStorage.getItem('anonymousCart') || '[]');
    const formData = new FormData();
    cartItems.forEach(itemId => formData.append('itemIds', itemId.toString()));

    return this.http.post<Icart[]>(`${this.apiUrl}/api/Courses/anonymous-cart`, formData).pipe(
      tap((course: Icart[]) => {
          // Announce the product added to the cart
          this.navbarRefreshService.refreshNavbar();
             }));


  }
  

  getWishlist(): Observable<Icourselong[]> {
    return this.http.get<Icourselong[]>(`${this.apiUrl}/api/Courses/courses-in-wishlist`).pipe(
      tap((course: Icourselong[]) => {
          // Announce the product added to the cart
          this.navbarRefreshService.refreshNavbar();
             }));

  }


  addToCart(id: number): Observable<Icourse> {
    // Make a POST request to the API endpoint with the request body
    return this.http.get<Icourse>(`${this.apiUrl}/api/Courses/add-course-to-cart/${id}`).pipe(
      tap((course: Icourse) => {
          // Announce the product added to the cart
          this.navbarRefreshService.refreshNavbar();
             })
  );
};
  

  addToWishlist(id: number): Observable<Icourse> {


    return this.http.get<Icourse>(`${this.apiUrl}/api/Courses/addCourseToWishlist/${id}`).pipe(
      tap((course: Icourse) => {
          // Announce the product added to the cart
          this.navbarRefreshService.refreshNavbar();
        }));
  }

  removeFromCart(courseId:number): Observable<any> {
    // Assuming you have an API endpoint to remove items from the cart
    return this.http.get<any>(`${this.apiUrl}/api/Courses/remove-course-from-cart/${courseId}`).pipe(
      tap((course: Icourse) => {
          // Announce the product added to the cart
          this.navbarRefreshService.refreshNavbar();
          }));
  }

  removeFromWishlist(courseId:number): Observable<any> {
    // Assuming you have an API endpoint to remove items from the cart
    return this.http.get<any>(`${this.apiUrl}/api/Courses/RemoveCourseFromWishlist/${courseId}`).pipe(
      tap((course: Icourse) => {
          // Announce the product added to the cart
          this.navbarRefreshService.refreshNavbar()
         }));
  }
  CompeleteCheckOut():Observable<any> {
    return this.http.post(`${this.apiUrl}/api/User/create-transaction`,{})
  }

}
