import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Icourse } from '../../Models/ICourse';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private productAddedToCartSource = new Subject<any>();
  private productAddedSourceToWishlist = new Subject<any>();

  productAddedToCart$ = this.productAddedToCartSource.asObservable();
  productAddedToWishlist$ = this.productAddedSourceToWishlist.asObservable();

  announceProductAddedToCart(course: Icourse) {
    this.productAddedToCartSource.next(course);
  }


  announceProductAddedToWishlist(course: Icourse) {
    this.productAddedSourceToWishlist.next(course);
  }
}