import { Component, OnChanges, OnInit } from '@angular/core';
import { Icourses } from '../../Models/icourses';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../Service1/data.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  {
  courses: any[]= [];
  searchTerm: string='';

  // constructor(private dataservice: DataService) { }

  // ngOnInit(): void {
  //   this.courses = this.dataservice.getCourses();
  // }

  // ngOnChanges(): void {
    //    search(): void {
    //   if (this.searchTerm) {
    //     this.courses = this.courses.filter(course =>
    //       course.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    //     );
    //   } else {
    //     this.courses = this.dataservice.getCourses();
    //   }
    // }
    // );




    // results: any[]=[];
    // query: string = '';

    // constructor(private dataserice: DataService) { }
  
    // search(query: string): void {
    //   this.dataserice.search(query)
    //     .subscribe((data: any) => {
    //       this.results = data.results;
    //     });
    // }
  }


