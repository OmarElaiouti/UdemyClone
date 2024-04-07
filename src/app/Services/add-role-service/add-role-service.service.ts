import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddRoleServiceService {

  constructor(private http: HttpClient) { }

  addRoleToUser(): Observable<any> {
    return this.http.get<any>('http://localhost:5165/api/User/add-instructor-role')
      }
    

}
