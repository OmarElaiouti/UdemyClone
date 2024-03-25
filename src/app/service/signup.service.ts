import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private userSignedUpSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  signup(userData: any) {
    // Make API call to signup endpoint
    return this.http.post('http://udemyclone.runasp.net/api/Register/register', userData);

  }

  isUserSignedUp() {
    // Return an Observable that emits the signup status
    return this.userSignedUpSubject.asObservable();
  }

  setUserSignedUp(status: boolean) {
    this.userSignedUpSubject.next(status);
  }
}
