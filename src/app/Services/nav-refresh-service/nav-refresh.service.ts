import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavRefreshService {

  private refreshSubject = new Subject<void>();
  refreshSubjectAsObservable$ = this.refreshSubject.asObservable();

  constructor() {}

  // Method to trigger refresh of the navigation bar
  refreshNavbar(): void {
    this.refreshSubject.next();
  }
  }
