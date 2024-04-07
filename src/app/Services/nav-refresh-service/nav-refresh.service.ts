import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavRefreshService {

  private refreshSubject = new Subject<void>();
  private refreshSubjectCart = new Subject<void>();

  private refreshSubjectNot = new Subject<void>();
  private refreshSubjectWi = new Subject<void>();

  refreshSubjectAsObservable$ = this.refreshSubject.asObservable();
  refreshSubjectAsObservableCart$ = this.refreshSubjectCart.asObservable();
  refreshSubjectAsObservableNotification$ = this.refreshSubjectNot.asObservable();
  refreshSubjectAsObservableWhishlist$ = this.refreshSubjectWi.asObservable();

  constructor() {}

  // Method to trigger refresh of the navigation bar
  refreshNavbar(): void {
    this.refreshSubject.next();
  }
  refreshNavbarCart(): void {
    this.refreshSubject.next();
  }
  refreshNavbarNot(): void {
    this.refreshSubject.next();
  }
  refreshNavbarWishlist(): void {
    this.refreshSubject.next();
  }
  }
