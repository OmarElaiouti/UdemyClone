import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(userData: any) {
    // Make API call to login endpoint
    return this.http.post('/api/login', userData);
  }
}
