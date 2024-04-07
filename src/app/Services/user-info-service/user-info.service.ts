import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../Models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get<any>('http://localhost:5165/api/User/get-user');
  }

  updateUser(user: IUser): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Methods': 'PUT',
    //     // Add any other required headers here
    //   })
    // };
    return this.http.post<IUser>('http://localhost:5165/api/User/edit-user-data', user);
  }

  deleteUser(): Observable<any> {
    return this.http.delete<any>('http://localhost:5165/api/User/delete-account');
  }
}
