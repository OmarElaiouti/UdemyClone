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

 
}
