import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseSliderComponent } from '../CourseSlider/course-slider/course-slider.component';
import { DataViewModule } from 'primeng/dataview';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Icart } from '../../Models/icart';

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
export class CartComponent implements OnInit{
  coursesInCart: Icart[] = [
    {
      img: '../../../assets/course_img/4898526_657d_2.jpg',
      title: 'Python Programming Language',
      price:299.99,
      instructor: 'John Doe',
      duration: 19.5,
      lectures:188,
      difficulity: ' .Intermediate',
      rating:4.5,
      numReviewers: 2345
    },
  ];
  // coursesInCart: any[] = [];
  // totalBill: number = 0;
  // couponApplied: boolean = false;
  // couponName: string = 'No Coupon';
  // wishedItems: any[] = [];

  // constructor(private cartService: CartService) { }

  // ngOnInit(): void {
  //   this.cartService.courses$.subscribe(courses => {
  //     this.coursesInCart = courses;
  //     this.calculateTotalBill();
  //     this.showWishlist();
  //   });
  // }

  // removeFromCart(course: any): void {
  //   this.cartService.removeFromCart(course);
  // }

  // moveToWishlist(course: any): void {
  //   this.cartService.moveToWishlist(course);
  // }

  // calculateTotalBill(): void {
  //   this.totalBill = this.coursesInCart.reduce((acc, course) => acc + parseFloat(course.price.replace('E£', '')), 0);
  // }

  // showWishlist(): void {
  //   const wishedItemsString = localStorage.getItem('wishlist');
  //   this.wishedItems = wishedItemsString ? JSON.parse(wishedItemsString) : [];
  // }

  // applyCoupon(): void {
  //   if (!this.couponApplied) {
  //     this.totalBill *= 0.9;
  //     this.couponApplied = true;
  //     this.couponName = '10% Off Coupon Applied';
  //   } else {
  //     this.calculateTotalBill();
  //   }
  // }

  // checkout(): void {
  //   this.cartService.checkout();
  //   // Additional logic after checkout if needed
  // }

  totalBill: number = 0;
  couponApplied: boolean = false;
  couponName: string = 'No Coupon';

  wishedItems: any[] = [];

  constructor(private router:Router) { }

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
    localStorage.setItem("checkoutCart", JSON.stringify(this.coursesInCart));
    this.router.navigate(['/checkout'])
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
