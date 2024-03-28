import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
//   coursesInCart: any[] = [];
//   totalBill: number = 0;
//   private coursesSubject = new BehaviorSubject<any[]>([]);
//   courses$ = this.coursesSubject.asObservable();

//   constructor() {
//     const cartItemsString = localStorage.getItem('cart');
//     const coursesInCart = cartItemsString ? JSON.parse(cartItemsString) : [];
//     this.coursesSubject.next(coursesInCart);
//   }

//   // removeFromCart(course: any): void {
//   //   const coursesInCart = this.coursesSubject.getValue().filter(item => item !== course);
//   //   localStorage.setItem("cart", JSON.stringify(coursesInCart));
//   //   this.coursesSubject.next(coursesInCart);
//   // }
//   removeFromCart(course: any): void {
//        this.coursesInCart = this.coursesInCart.filter(item => item !== course);
//        localStorage.setItem("cart", JSON.stringify(this.coursesInCart));
//       this.calculateTotalBill();
//      }
//      calculateTotalBill(): void {
//       this.totalBill = this.coursesInCart.reduce((acc, course) => acc + parseFloat(course.price.replace('E£', '')), 0);
//     }

//   moveToWishlist(course: any): void {
//     this.removeFromCart(course);
//     const wishedItemsString = localStorage.getItem('wishlist');
//     const wishedItems = wishedItemsString ? JSON.parse(wishedItemsString) : [];
//     wishedItems.push(course);
//     localStorage.setItem("wishlist", JSON.stringify(wishedItems));
//   }

//   checkout(): void {
//     const cartItems = this.coursesSubject.getValue();
//     // You can implement logic here to handle the checkout process
//     // For example, sending cart items to a server, processing payment, etc.
//     // Once the checkout process is completed successfully, you can clear the cart
//     localStorage.removeItem('cart');
//     this.coursesSubject.next([]);
//   }
// }



}
