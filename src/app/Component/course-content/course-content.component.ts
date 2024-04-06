import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Itwo } from '../../Models/itwo';


@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [CommonModule,CarouselModule,ButtonModule],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent {
  courses = [
    {id:1, name: 'Course 1', instructor: 'Instructor 1', rating: 4.5, price: 50, inventoryStatus: 'In Stock', numReviewers: 5651,disc:'dygfoe dpuywejhdw pw97d8wd pd9ywtdg' },
    {id:2,name: 'Course 2 with a very long name', instructor: 'Instructor 2 with a very long name', rating: 4.8, price: 60, inventoryStatus: 'Out of Stock', numReviewers: 8723,disc:'dygfoe dpuywejhdw pw97d8wd pd9ywtdg' },
    {id:3, name: 'Course 3', instructor: 'Instructor 3', rating: 3.9, price: 45, inventoryStatus: 'In Stock', numReviewers: 3210,disc:'dygfoe dpuywejhdw pw97d8wd pd9ywtdg' },
    {id:4, name: 'Course 4', instructor: 'Instructor 4', rating: 4.2, price: 55, inventoryStatus: 'Out of Stock', numReviewers: 4567,disc:'dygfoe dpuywejhdw pw97d8wd pd9ywtdg' },
    {id:5, name: 'Course 5', instructor: 'Instructor 5', rating: 4.7, price: 65, inventoryStatus: 'In Stock', numReviewers: 7890 ,disc:'dygfoe dpuywejhdw pw97d8wd pd9ywtdg'},
    { name: 'Course 6', instructor: 'Instructor 6', rating: 4.1, price: 40, inventoryStatus: 'Out of Stock', numReviewers: 2345,disc:'dygfoe dpuywejhdw pw97d8wd pd9ywtdg' },

];

  // Responsive options for the carousel
  responsiveOptions= [
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

