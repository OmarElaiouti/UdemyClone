import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-sliderss',
  standalone: true,
  imports: [CarouselModule ,ButtonModule],
  templateUrl: './sliderss.component.html',
  styleUrl: './sliderss.component.css'
})
export class SliderssComponent {

  courses = [
    { name: 'Course 1',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 1', rating: 4.5, price: 50, inventoryStatus: 'In Stock', numReviewers: 5651 },
    { name: 'Course 2 with a very long name',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 2 with a very long name', rating: 4.8, price: 60, inventoryStatus: 'Out of Stock', numReviewers: 8723 },
    { name: 'Course 3',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 3', rating: 3.9, price: 45, inventoryStatus: 'In Stock', numReviewers: 3210 },
    { name: 'Course 4',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 4', rating: 4.2, price: 55, inventoryStatus: 'Out of Stock', numReviewers: 4567 },
    { name: 'Course 5',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 5', rating: 4.7, price: 65, inventoryStatus: 'In Stock', numReviewers: 7890 },
    { name: 'Course 6',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 6', rating: 4.1, price: 40, inventoryStatus: 'Out of Stock', numReviewers: 2345 },
    // Add more courses as needed
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
