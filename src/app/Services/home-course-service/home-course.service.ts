import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icourse, IcourseWithObjectives, Icourselong } from '../../Models/ICourse';

@Injectable({
  providedIn: 'root'
})
export class HomeCourseService {

  constructor(private http: HttpClient) { }
  
  // Method to fetch courses based on selected category
  getCoursesByCategory(category: string): Observable<Icourselong[]> {
  
    return this.http.get<Icourselong[]>(`http://localhost:5165/api/Courses/by-category?categoryName=${category}`);

  }

  getCoursesWithObjectivesByCategory(category: string,num?:number): Observable<IcourseWithObjectives[]> {
    if (num){
      return this.http.get<IcourseWithObjectives[]>(`http://localhost:5165/api/Courses/by-category-with-objectives=${category}&num=${num}`);
    }
    return this.http.get<IcourseWithObjectives[]>(`http://localhost:5165/api/Courses/by-category-with-objectives=${category}`);

  }

  getRandomCourses(): Observable<IcourseWithObjectives[]> {
    return this.http.get<IcourseWithObjectives[]>(`http://localhost:5165/api/Courses/random`);
  }

  // Method to fetch courses with highest scores
  getTopRatedCourses(): Observable<IcourseWithObjectives[]> {
    return this.http.get<IcourseWithObjectives[]>('http://localhost:5165/api/Courses/top-rated');
  }

 
}
