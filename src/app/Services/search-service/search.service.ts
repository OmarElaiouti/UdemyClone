import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RouteReuseStrategy, Router } from '@angular/router';
import { Icourse, IcourseWithObjectives, Icourselong } from '../../Models/ICourse';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  

  constructor(private http: HttpClient,private router:Router) {}


  searchCoursesForSearchResult(query:string): Observable<Icourselong[]> {
    return this.http.get<Icourselong[]>(`http://localhost:5165/api/Courses/searched-courses?searchString=${query}`).pipe(
      tap(results => {
        // Check if there are any results returned
        if (results && results.length > 0) {
          // Save the query to local storage
          localStorage.setItem('lastSearchQuery', query);
        }
      })
    );

  }



  searchCoursesByKeywordForHome(keyword: string): Observable<IcourseWithObjectives[]> {
    return this.http.get<IcourseWithObjectives[]>(`http://localhost:5165/api/Courses/saved-search?searchHitory=${keyword}`);
  }

 

}
