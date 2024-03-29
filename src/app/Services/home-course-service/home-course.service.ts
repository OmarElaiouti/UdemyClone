import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IcourseSmallCard } from '../../Models/ICourse';

@Injectable({
  providedIn: 'root'
})
export class HomeCourseService {

  constructor(private http: HttpClient) { }
  
  // Method to fetch courses based on selected category
  getCoursesByCategory(category: string,num?:number): Observable<IcourseSmallCard[]> {
    if (num){
      return this.http.get<IcourseSmallCard[]>(`/api/courses?category=${category}&num=${num}`);

    }
    return this.http.get<IcourseSmallCard[]>(`/api/courses?category=${category}`);

  }

  getRandomCourses(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/slidercourses`);
  }

  // Method to fetch courses with highest scores
  getTopRatedCourses(): Observable<IcourseSmallCard[]> {
    return this.http.get<IcourseSmallCard[]>('/api/top-rated-courses');
  }

 
}
