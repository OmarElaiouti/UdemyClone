import { Component,ElementRef, ViewChild, AfterViewInit, OnInit, HostListener, SimpleChanges, Input  } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule, Routes } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { UserCoursesService } from '../../../Services/user-courses-service/user-courses.service';
import { Icourse, IcourseWithObjectives } from '../../../Models/ICourse';
import { NavRefreshService } from '../../../Services/nav-refresh-service/nav-refresh.service';

@Component({
  selector: 'app-course-slider',
  standalone: true,
  imports: [CarouselModule,ButtonModule,RouterModule,TooltipModule  ],
  templateUrl: './course-slider.component.html',
  styleUrl: './course-slider.component.css'
})
export class CourseSliderComponent {

displayCourse(_t36: any) {  
throw new Error('Method not implemented.');
}
addToCart(_t36: any) {
throw new Error('Method not implemented.');
}
  @Input() courses: IcourseWithObjectives[] = [];
  @Input() loggedIn!:boolean;

constructor(private usercoursesService:UserCoursesService,
  private navbarRefreshService:NavRefreshService,
  private route:Router,

  ){}
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

  AddToCart(id:number) {
    // Call the addToCart function from the cart service when the button is clicked
    this.usercoursesService.addToCart(id).subscribe({
      next: response => {
        console.log('Course added to the cart successfully:', response);
      },
      error: err => {
        // Handle error if needed
        console.error('Error adding course to the cart:', err);
      }
    }
    );

  }

  AddToWishList(id:number) {
    // Call the addToCart function from the cart service when the button is clicked
    this.usercoursesService.addToWishlist(id).subscribe({
      next: response => {
        console.log('Course added to cart successfully:', response);
      },
      error: err => {
        // Handle error if needed
        console.error('Error adding course to cart:', err);
      }
    }
    );

  }

  addToCartAnonymous(id: number): void {
    let cartItems: number[] = JSON.parse(localStorage.getItem('anonymousCart') || '[]');
  
    if (!cartItems.includes(id)) {
      cartItems.push(id);
      localStorage.setItem('anonymousCart', JSON.stringify(cartItems));
      this.navbarRefreshService.refreshNavbar();
    } else {
      console.log('ID already exists in the cart.');
    }
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
RouteToDetails(id: number): void {
  this.route.navigate(['/coursedetails', id]);
}

}
