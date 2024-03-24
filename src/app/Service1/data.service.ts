import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Icourses } from '../Models/icourses';

@Injectable({
  providedIn: 'root'
})
export class DataService {

constructor(private http: HttpClient) { }



searchProducts(searchText: string): Observable<Icourses[]> {
  return this.http.get<Icourses[]>('https://jsonplaceholder.typicode.com/comments')
    .pipe(map((dd: Icourses[]) => dd.filter((pp) => pp.name.includes(searchText))
      )
    );
}


}