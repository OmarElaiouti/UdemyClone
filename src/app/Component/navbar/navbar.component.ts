import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   logolink(): void {
    window.location.href = "index.html";
  }

   cartPage(): void {
    window.location.href = "pages/cart.html";
  }

   loginPage(): void {
    window.location.href = "pages/login.html";
  }

   signupPage(): void {
    window.location.href = "pages/signup.html";
  }

   exploreCourses(): void {
    window.location.href = "Component\category\category.component.html";
  }

   singleProduct(): void {
    window.location.href = "pages/product.html";
  }

}
