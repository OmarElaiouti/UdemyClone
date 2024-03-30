import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseSliderComponent } from '../CourseSlider/course-slider/course-slider.component';
import { DataViewModule } from 'primeng/dataview';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Icart } from '../../Models/icart';
import { UserCoursesService } from '../../Services/user-courses-service/user-courses.service';

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
export class CartComponent{
  // coursesInCart: Icart[] = [
  //   {
  //     id:1,
  //     img: '../../../assets/course_img/4898526_657d_2.jpg',
  //     title: 'Python Programming Language',
  //     price:299.99,
  //     instructor: 'John Doe',
  //     duration: 19.5,
  //     lectures:188,
  //     difficulity: ' .Intermediate',
  //     rating:4.5,
  //     numReviewers: 2345
  //   },
  // ];
  totalBill: number = 0;
  couponApplied: boolean = false;
  couponName: string = 'No Coupon';

  wishedItems: any[] = [];

  constructor(private router:Router,private usercoursesService:UserCoursesService) { }

  // ngOnInit(): void {
  //   this.calculateTotalBill();
  //   this.showWishlist();
  // }
  coursesInCart: Icart[] = [];
  ngOnInit(): void {
    this.usercoursesService.getCart().subscribe({
      next:(data)=>{
        this.coursesInCart=data;
      }
    })
  }

  // removeFromCart(course: any): void {
  //   this.coursesInCart = this.coursesInCart.filter(item => item !== course);
  //   localStorage.setItem("cart", JSON.stringify(this.coursesInCart));
  //   this.calculateTotalBill();
  // }
  removeFromCart(course: Icart): void {
    this.usercoursesService.removeFromCart(course.id).subscribe({
        next: () => {
            // On successful removal from the server, update the local data and calculate the total bill
            this.coursesInCart = this.coursesInCart.filter(item => item !== course);
            localStorage.setItem("cart", JSON.stringify(this.coursesInCart));
            this.calculateTotalBill();
        },
        error: (error) => {
            // Handle error if necessary
            console.error("Error occurred while removing item from cart:", error);
        }
    });
}


  // moveToWishlist(course: any): void {
  //   this.wishedItems.push(course);
  //   localStorage.setItem("wishlist", JSON.stringify(this.wishedItems));
  //   this.removeFromCart(course);
  // }
  moveToWishlist(course: Icart): void {
    this.usercoursesService.addToWishlist(course.id)
      .subscribe({
        next:() => {
          console.log('Course moved to wishlist successfully');
          // Implement any additional logic here, such as updating UI
        },
        error:(error) => {
          console.error('Error moving course to wishlist:', error);
          // Handle error appropriately
        }
  });
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













