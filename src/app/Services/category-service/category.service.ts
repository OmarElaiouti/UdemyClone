import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icourselong, Instructor } from '../../Models/ICourse';
import { Icategory } from '../../Models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getHighestScoreTopicByParent(parentName: string): Observable<Icategory[]> {
    // Replace '/api/categories' with your actual API endpoint for fetching categories by parent name
    return this.http.get<Icategory[]>(`/api/categories?parentName=${parentName}`);
  }

  getAllCategories(): Observable<Icategory[]> {
    // Replace '/api/allCategories' with your actual API endpoint for fetching all categories
    return this.http.get<Icategory[]>('/api/allCategories');
  }
  getSubcategoriesByParent(parentName: string): Observable<Icategory[]> {
    // Replace '/api/subcategories' with your actual API endpoint for fetching subcategories by parent
    return this.http.get<Icategory[]>(`/api/subcategories?parentId=${parentName}`);
  }

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>('YOUR_API_ENDPOINT_HERE');
  }
 
}
