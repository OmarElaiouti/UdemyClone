import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getHighestScoreTopicByParent(parentName: string): Observable<any[]> {
    // Replace '/api/categories' with your actual API endpoint for fetching categories by parent name
    return this.http.get<any[]>(`/api/categories?parentName=${parentName}`);
  }

  getAllCategories(): Observable<any[]> {
    // Replace '/api/allCategories' with your actual API endpoint for fetching all categories
    return this.http.get<any[]>('/api/allCategories');
  }
  getSubcategoriesByParent(parentName: string): Observable<any[]> {
    // Replace '/api/subcategories' with your actual API endpoint for fetching subcategories by parent
    return this.http.get<any[]>(`/api/subcategories?parentId=${parentName}`);
  }

  getCoursesInCategory(query:string): Observable<any> {
    // return this.http.get<any>(`https://mocki.io/v1/814911a6-bc8c-41ef-b797-3878165d8ea3`);
    return this.http.get<any>(`http://localhost:5165/api/category?name=${query}`);

  }
 
}
