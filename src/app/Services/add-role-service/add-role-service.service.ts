import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddRoleServiceService {

  constructor(private http: HttpClient) { }

  addRoleToUser(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' // Specify responseType as 'text'
    };
    return this.http.get<any>('http://localhost:5165/api/User/add-instructor-role')
  }
    

}
