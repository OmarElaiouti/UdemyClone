import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { NavRefreshService } from '../nav-refresh-service/nav-refresh.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private userSignedUpSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,private navbarRefreshService:NavRefreshService) {}



  signUp(username: string, email: string, password: string ): Observable<boolean> {

    return this.http.post<any>(`http://localhost:5165/api/Register/register`, { username,email,password}).pipe(
      map(response => {
        // Store user authentication state (e.g., in local storage or session storage)
        console.log(response);

        localStorage.setItem('token', response.token);
this.navbarRefreshService.refreshNavbar();
   return true; // Sign-up and sign-in successful
      }),
      catchError(error => {
        console.error('Sign-up and sign-in error:', error);
        return of(false); // Sign-up or sign-in failed
      })
    );
  }

  isUserSignedUp() {
    // Return an Observable that emits the signup status
    return this.userSignedUpSubject.asObservable();
  }

  setUserSignedUp(status: boolean) {
    this.userSignedUpSubject.next(status);
  }
}
