import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IcourseSmallCard, Icourses } from '../../Models/ICourse';
import { Observable, tap } from 'rxjs';
import { RouteReuseStrategy, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  

  constructor(private http: HttpClient,private router:Router) {}


  searchCoursesForSearchResult(query:string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5165/api/Courses?searchString=${query}`);

  }


  searchCoursesByKeywordForHome(keyword: string): Observable<IcourseSmallCard[]> {
    return this.http.get<IcourseSmallCard[]>(`/api/search?keyword=${keyword}`);
  }

 

}
