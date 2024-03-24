import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Icourses } from '../Models/ICourse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
//   private   courses =  [
//     { name: 'Course 1',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 1', rating: 4.5, price: 50, Status: 'Highest rated', totalHour: 5 ,'totallectuer':16},
//     { name: 'Course 2 ',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 2 with a very long name', rating: 4.8, price: 60, Status: 'New', totalHour: 23,'totallectuer':16 },
//     { name: 'Course 3',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 3', rating: 3.9, price: 45, Status: 'Highest rated', totalHour: 1,'totallectuer':16 },
//     { name: 'Course 4',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 4', rating: 4.2, price: 55, Status: 'New', totalHour: 3,'totallectuer':16 },
//     { name: 'Course 5',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 5', rating: 4.7, price: 65, Status: 'Highest rated', totalHour: 2 ,'totallectuer':16 },
//     { name: 'Course 6',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 6', rating: 4.1, price: 40, Status: 'New', totalHour: 3 ,'totallectuer':16},
//     // Add more courses as needed
//   ];

//   constructor() { }

//   getCourses(): any[] {
//     return this.courses;
// }

// private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

constructor(private http: HttpClient) { }

// search(query: string): Observable<any> {
//   return this.http.get(`${this.apiUrl}?query=${query}`);
// }

searchProducts(searchText: string): Observable<any[]> {
  return this.http.get<Icourses[]>('https://jsonplaceholder.typicode.com/comments')
    .pipe(map((dd: Icourses[]) => dd.filter((pp) => pp.name.includes(searchText))
      )
    );
}
}