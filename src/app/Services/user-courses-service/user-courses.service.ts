import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IcoursesMylearning } from '../../Models/ICourse';
import { Icart } from '../../Models/icart';

@Injectable({
  providedIn: 'root'
})
export class UserCoursesService {

  private apiUrl = '/api/user-courses'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) {}

  getMyLearningCourses(): Observable<any[]> {
    return this.http.get<IcoursesMylearning[]>(this.apiUrl);
  }

  getCart(): Observable<Icart[]> {
    return this.http.get<Icart[]>(`https://mocki.io/v1/2150ebba-5b7b-4bf4-b79c-4df41f5fe1db`);
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

  removeFromCart(id:number): Observable<any> {
    // Assuming you have an API endpoint to remove items from the cart
    const apiUrl = 'your_api_endpoint_here'; // Replace 'your_api_endpoint_here' with your actual API endpoint
    return this.http.post<any>(apiUrl, id);
  }

  CompeleteCheckOut():Observable<any> {
    const requestBody ={};
    const apiUrl = 'your_api_endpoint_here';
    return this.http.post<any>(apiUrl,requestBody)
  }

}
