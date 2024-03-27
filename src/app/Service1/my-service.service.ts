import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icourses } from '../Models/ICourse';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get<any>('https://mocki.io/v1/814911a6-bc8c-41ef-b797-3878165d8ea3');
  }

}
