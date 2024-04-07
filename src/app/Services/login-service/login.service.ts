import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserCoursesService } from '../user-courses-service/user-courses.service';
import { NavRefreshService } from '../nav-refresh-service/nav-refresh.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private userCourses:UserCoursesService, private navbarRefreshService:NavRefreshService) {}

  login(email: string, password: string):Observable<boolean> {
    // Make API call to login endpoint
    return this.http.post<any>('http://localhost:5165/api/Register/Login', {email,password}).pipe(
      map(response => {
        // Store user authentication state (e.g., in local storage or session storage)

        localStorage.setItem('token', response.token);
        this.navbarRefreshService.refreshNavbar();

        const cartItems = JSON.parse(localStorage.getItem('anonymousCart') || '[]');
    if (cartItems.length != 0) {
      cartItems.map((CourseId: number) => this.userCourses.addToCart(CourseId).subscribe({
        next: r=>{
          console.log("Courses added to cart successfully");
          localStorage.removeItem("anonymousCart")
        },
        error:err=>{
          console.log("error adding courses to cart");
          
        }
    }));
    }
   
        return true; // Sign-up and sign-in successful
      }),
      catchError(error => {
        console.error('Sign-up and sign-in error:', error);
        return of(false); // Sign-up or sign-in failed
      }));
  }

}
