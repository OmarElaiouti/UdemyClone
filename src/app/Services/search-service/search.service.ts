import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IcourseSmallCard, Icourses } from '../../Models/ICourse';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchResult:string="";

  constructor(private http: HttpClient) {}

  setSearchResult(searchString: string): void {
    this.searchResult = searchString;
    console.log(this.searchResult);

  }

  searchCoursesForSearchResult(): Observable<any[]> {
    console.log(this.searchResult);
    return this.http.get<any[]>(`http://localhost:3000/courses?searchString=${this.searchResult}`);
  }


  searchCoursesByKeywordForHome(keyword: string): Observable<IcourseSmallCard[]> {
    return this.http.get<IcourseSmallCard[]>(`/api/search?keyword=${keyword}`);
  }
}
