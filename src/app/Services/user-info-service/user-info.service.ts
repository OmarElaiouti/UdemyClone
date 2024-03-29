import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../Models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>('/api/userinfo');
  }

  updateUser(user: IUser): Observable<any> {
    return this.http.put<IUser>('/api/userinfo', user);
  }

}
