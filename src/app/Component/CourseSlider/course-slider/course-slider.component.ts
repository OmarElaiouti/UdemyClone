import { Component,ElementRef, ViewChild, AfterViewInit, OnInit, HostListener, SimpleChanges, Input  } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { UserCoursesService } from '../../../Services/user-courses-service/user-courses.service';

@Component({
  selector: 'app-course-slider',
  standalone: true,
  imports: [CarouselModule,ButtonModule,RouterModule,TooltipModule  ],
  templateUrl: './course-slider.component.html',
  styleUrl: './course-slider.component.css'
})
export class CourseSliderComponent {
  courseId!:number;
displayCourse(_t36: any) {
throw new Error('Method not implemented.');
}
addToCart(_t36: any) {
throw new Error('Method not implemented.');
}
  @Input() courses: any[] = [];

constructor(private usercoursesService:UserCoursesService){}
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

  AddToCart() {
    // Call the addToCart function from the cart service when the button is clicked
    this.usercoursesService.addToCart(this.courseId).subscribe(
      response => {
        // Handle success response if needed
        console.log('Course added to cart successfully:', response);
      },
      error => {
        // Handle error if needed
        console.error('Error adding course to cart:', error);
      }
    );
  }

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
