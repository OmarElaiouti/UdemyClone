import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string):Observable<boolean> {
    // Make API call to login endpoint
    return this.http.post<any>('http://udemyclone.runasp.net/api/Register/Login', {email,password}).pipe(
      map(response => {
        // Store user authentication state (e.g., in local storage or session storage)

        localStorage.setItem('accessToken', response.token);
        alert("iyfi");
        return true; // Sign-up and sign-in successful
      }),
      catchError(error => {
        console.error('Sign-up and sign-in error:', error);
        return of(false); // Sign-up or sign-in failed
      }));
  }

}
