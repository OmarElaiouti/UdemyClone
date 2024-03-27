import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { Icourses } from '../../Models/ICourse';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-lastslider',
  standalone: true,
  imports: [PaginatorModule, ButtonModule, CommonModule,MatPaginatorModule],
  templateUrl: './lastslider.component.html',
  styleUrl: './lastslider.component.css'
})
export class LastsliderComponent {
  // @Input()
  //  courses = [
  //   { name: 'Course 1',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 1', rating: 4.5, price: 50, Status: 'Highest rated', totalHour: 5 ,'totallectuer':16},
  //   { name: 'Course 2 ',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 2 with a very long name', rating: 4.8, price: 60, Status: 'New', numReviewers: 8723,'totallectuer':16 },
  //   { name: 'Course 3',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 3', rating: 3.9, price: 45, Status: 'Highest rated', totalHour: 1,'totallectuer':16 },
  //   { name: 'Course 4',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 4', rating: 4.2, price: 55, Status: 'New', totalHour: 3,'totallectuer':16 },
  //   { name: 'Course 5',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 5', rating: 4.7, price: 65, Status: 'Highest rated', totalHour: 2 ,'totallectuer':16 },
  //   { name: 'Course 6',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 6', rating: 4.1, price: 40, Status: 'New', totalHour: 3 ,'totallectuer':16},
  // ];


  courses: Icourses[] = [];

  // constructor(private getcat: MyServiceService) {}

  // getallcat() {
  //   this.getcat.getCourses().subscribe({
  //     next: (data) => {
  //       this.courses = data;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching courses:', error);
  //     }
  //   });
  // }
  
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;


  // ngOnInit(): void {
  //   this.fetchData();
  //    this.getallcat();
  // }

  // fetchData(): void {
  //   const params = { page: this.currentPage.toString(), per_page: this.itemsPerPage.toString() };
  //   this.getcat.getCourses().subscribe(response => {
  //     this.courses = response.items;
  //     this.totalItems = response.total_count; // Assuming the API returns total count
  //   });
  // }

  // onPageChange(event: PageEvent): void {
  //   this.currentPage = event.pageIndex + 2; // pageIndex starts from 0
  //   this.fetchData();
  // }


//////////////////////////////////
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
    // Add more responsive options as needed
  ];

  // Function to get the severity for the inventory status
  getStarArray(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const starArray = Array(fullStars).fill(0);
    if (halfStars > 0) {
      starArray.push(halfStars); // Add half star if applicable
    }
    return starArray;
  }
}
