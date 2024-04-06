import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icourselong } from '../../Models/ICourse';
import { Icategory } from '../../Models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // getHighestScoreTopicByParent(parentName: string): Observable<Icategory[]> {
  //   // Replace '/api/categories' with your actual API endpoint for fetching categories by parent name
  //   return this.http.get<Icategory[]>(`/api/categories?parentName=${parentName}`);
  // }

  getAllCategories(): Observable<Icategory[]> {
    // Replace '/api/allCategories' with your actual API endpoint for fetching all categories
    return this.http.get<Icategory[]>('/api/Category/get-categories');
  }
  getSubcategoriesOrTopicsByParentName(parentName: string): Observable<Icategory[]> {
    // Replace '/api/subcategories' with your actual API endpoint for fetching subcategories by parent
    return this.http.get<Icategory[]>(`/api/Category/${parentName}/subcategories-or-topics`);
  }

 
}
