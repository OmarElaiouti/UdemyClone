import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseSliderComponent } from '../CourseSlider/course-slider/course-slider.component';
import { DataViewModule } from 'primeng/dataview';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Icart } from '../../Models/icart';
import { UserCoursesService } from '../../Services/user-courses-service/user-courses.service';
import { Icourse, IcourseWithObjectives } from '../../Models/ICourse';
import { HomeCourseService } from '../../Services/home-course-service/home-course.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { NavRefreshService } from '../../Services/nav-refresh-service/nav-refresh.service';

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
  totalBill!: string;
  couponApplied: boolean = false;
  couponName: string = 'No Coupon';

  wishedItems: any[] = [];
  randomCourses!: IcourseWithObjectives[];
  constructor(private router: Router, private usercoursesService: UserCoursesService
    , private randomCoursesService: HomeCourseService
    ,private navbarRefreshService:NavRefreshService
    ) { }

  // ngOnInit(): void {
  //   this.calculateTotalBill();
  //   this.showWishlist();
  // }
  private navbarRefreshSubscription!: Subscription;

  loggedIn: boolean = false;
  coursesInCart: Icart[] = [];
  ngOnInit(): void {
    let loginFlag = localStorage.getItem('token');
    if (loginFlag) {
      this.loggedIn = true
      this.usercoursesService.getCart().subscribe({
        next: (data) => {
          this.coursesInCart = data;
          this.totalBill = this.calculateTotalPrice(this.coursesInCart)
        }
      })
    } else {
      this.usercoursesService.getAnonymousCart().subscribe({
        next: (data) => {
          this.coursesInCart = data;
          this.totalBill = this.calculateTotalPrice(this.coursesInCart)
        }
      })

    }

    this.randomCoursesService.getRandomCourses().subscribe(courses => {
      this.randomCourses = courses; 
    });

    // this.navbarRefreshSubscription = this.navbarRefreshService.refreshSubjectAsObservable$.subscribe(() => {
    
    //   let loginFlag = localStorage.getItem('token');
    //   if (loginFlag) {
    //     this.loggedIn = true
    //     this.usercoursesService.getCart().subscribe({
    //       next: (data) => {
    //         this.coursesInCart = data;
    //         this.totalBill = this.calculateTotalPrice(this.coursesInCart)
    //       }
    //     })
    //   } else {
    //     this.usercoursesService.getAnonymousCart().subscribe({
    //       next: (data) => {
    //         this.coursesInCart = data;
    //         this.totalBill = this.calculateTotalPrice(this.coursesInCart)
    //       }
    //     })
  
    //   }
    
    
    // })


  }

  // removeFromCart(course: any): void {
  //   this.coursesInCart = this.coursesInCart.filter(item => item !== course);
  //   localStorage.setItem("cart", JSON.stringify(this.coursesInCart));
  //   this.calculateTotalBill();
  // }
  removeFromCart(course: Icart): void {
    if (this.loggedIn) {
      // Remove course from the cart for logged-in users
      this.usercoursesService.removeFromCart(course.id).subscribe({
        next: () => {
          // Update the courses in cart
          this.coursesInCart = this.coursesInCart.filter(item => item !== course);
          localStorage.setItem("cart", JSON.stringify(this.coursesInCart));
          // Recalculate the total price
          this.calculateTotalPrice(this.coursesInCart);

        },
        error: (error) => {
          // Handle error if necessary
          console.error("Error occurred while removing item from cart:", error);
        }
      });
    } else {
      // Remove course from the cart for anonymous users
      this.updateCartAfterRemoval(course);
  }
}

private updateCartAfterRemoval(course: Icart): void {
  this.coursesInCart = this.coursesInCart.filter(item => item !== course);
  localStorage.setItem("cart", JSON.stringify(this.coursesInCart));
  if (!this.loggedIn) {
    this.updateAnonymousCart(course.id);
  }
  this.calculateTotalPrice(this.coursesInCart);
  this.refreshNavbar();
}

private updateAnonymousCart(courseId: number): void {
  let anonymousCartIds: number[] = [];
  const storedCartIds = localStorage.getItem("anonymousCart");
  if (storedCartIds) {
    try {
      anonymousCartIds = JSON.parse(storedCartIds);
      anonymousCartIds = anonymousCartIds.filter(id => id !== courseId);
      if (anonymousCartIds.length === 0) {
        localStorage.removeItem("anonymousCart");
      } else {
        localStorage.setItem("anonymousCart", JSON.stringify(anonymousCartIds));
      }
    } catch (error) {
      console.error("Error parsing anonymousCart from localStorage:", error);
    }
  }
}

private refreshNavbar(): void {
  this.navbarRefreshService.refreshNavbar();
}



  // moveToWishlist(course: any): void {
  //   this.wishedItems.push(course);
  //   localStorage.setItem("wishlist", JSON.stringify(this.wishedItems));
  //   this.removeFromCart(course);
  // }
  moveToWishlist(course: Icart): void {
    this.wishedItems.push(course);
    const index = this.coursesInCart.indexOf(course);
    if (index !== -1) {
      this.coursesInCart.splice(index, 1);
    } this.usercoursesService.addToWishlist(course.id)
      .subscribe({
        next: () => {

          console.log('Course moved to wishlist successfully');
          // Implement any additional logic here, such as updating UI
        },
        error: (error) => {
          console.error('Error moving course to wishlist:', error);
          // Handle error appropriately
        }
      });

  }

  private calculateTotalPrice(cart: Icart[]): string {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    return totalPrice.toFixed(2);;
  }

  // calculateTotalBill(): void {
  //   this.totalBill = this.coursesInCart.reduce((acc, course) => acc + course.price, 0);
  // }

  showWishlist(): void {
    const wishedItemsString = localStorage.getItem('wishlist');
    this.wishedItems = wishedItemsString ? JSON.parse(wishedItemsString) : [];
  }

  // applyCoupon(): void {
  //   if (!this.couponApplied) {
  //     this.totalBill *= 0.9;
  //     this.couponApplied = true;
  //     this.couponName = '10% Off Coupon Applied';
  //   } else {
  //     this.calculateTotalBill();
  //   }
  // }
  checkout(): void {
    if (!this.loggedIn) {
      this.router.navigate(["login"]);
    } else {
      localStorage.setItem("checkoutCart", JSON.stringify(this.coursesInCart));
      this.router.navigate(['/checkout'])
    }
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

  ngOnDestroy(): void {
    this.navbarRefreshSubscription.unsubscribe();
  }
}













