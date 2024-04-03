import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavRefreshService } from '../nav-refresh-service/nav-refresh.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private router: Router,
    private navbarRefreshService: NavRefreshService
  ) {}

  logout() {
    // Remove token from local storage (assuming 'token' is the key used to store it)
    localStorage.clear();

    // Reset any other user-related state if needed

    // Trigger navbar refresh
    this.navbarRefreshService.refreshNavbar();

    // Optionally navigate to the login page or any other desired page
    this.router.navigate(['/login']);
  }
}
