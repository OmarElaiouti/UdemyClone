import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IcourseSmallCard, Icourses } from '../../Models/ICourse';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  constructor(private http: HttpClient) {}

 
  searchCoursesForSearchResult(query: string): Observable<Icourses[]> {
    return this.http.get<Icourses[]>(`/api/search?query=${query}`).pipe(
      tap((courses: Icourses[]) => {
        if (courses.length > 0) {
          // Save the search query to local storage if results are found
          localStorage.setItem('lastSearchQuery', query);
        }
      })
    );
  }

  searchCoursesByKeywordForHome(keyword: string): Observable<IcourseSmallCard[]> {
    return this.http.get<IcourseSmallCard[]>(`/api/search?keyword=${keyword}`);
  }
}
