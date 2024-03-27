import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CourseSliderComponent } from '../CourseSlider/course-slider/course-slider.component';
import { DataViewModule } from 'primeng/dataview';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  imports: [
    CommonModule,
    CourseSliderComponent,
    DataViewModule,
    RouterModule
  ],
})
export class CartComponent {
  coursesInCart: any[] = [
    {
      img: '../../../assets/course_img/4898526_657d_2.jpg',
      title: 'Python Programming Language',
      price: 'E£299.99',
      instructor: 'John Doe',
      duration: '19.5 total hours',
      lectures: '. 188 lectures',
      difficulity: ' .Intermediate',
      rating:4.5,
      numReviewers: 2345
    },
  ];

  totalBill: number = 0;
  couponApplied: boolean = false;
  couponName: string = 'No Coupon';

  wishedItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.calculateTotalBill();
    this.showWishlist();
  }

  removeFromCart(course: any): void {
    this.coursesInCart = this.coursesInCart.filter(item => item !== course);
    localStorage.setItem("cart", JSON.stringify(this.coursesInCart));
    this.calculateTotalBill();
  }

  moveToWishlist(course: any): void {
    this.wishedItems.push(course);
    localStorage.setItem("wishlist", JSON.stringify(this.wishedItems));
    this.removeFromCart(course);
  }

  calculateTotalBill(): void {
    this.totalBill = this.coursesInCart.reduce((acc, course) => acc + course.price, 0);
  }

  showWishlist(): void {
    const wishedItemsString = localStorage.getItem('wishlist');
    this.wishedItems = wishedItemsString ? JSON.parse(wishedItemsString) : [];
  }

  applyCoupon(): void {
    if (!this.couponApplied) {
      this.totalBill *= 0.9;
      this.couponApplied = true;
      this.couponName = '10% Off Coupon Applied';
    } else {
      this.calculateTotalBill();
    }
  }
  checkout(): void {

  }

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
