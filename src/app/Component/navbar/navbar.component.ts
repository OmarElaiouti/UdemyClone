import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

 categories: any = [
    { id: 1, name: "Category 1", parentId: null },
    { id: 2, name: "Category 2", parentId: null },
    { id: 3, name: "Category 3", parentId: null },
    { id: 5, name: "Category 1", parentId: null },
    { id: 6, name: "Category 2", parentId: null },
    { id: 7, name: "Category 3", parentId: null },
  ];
  
  subcategories: any = [
    { id: 8, name: "Subcategory 1", parentId: 1 },
    { id: 9, name: "Subcategory 2", parentId: 1 },
    { id: 10, name: "Subcategory 3", parentId: 1 },
    { id: 11, name: "Subcategory 1", parentId: 2 },
    { id: 12, name: "Subcategory 2", parentId: 2 },
    { id: 13, name: "Subcategory 3", parentId: 2 },
    { id: 14, name: "Subcategory 1", parentId: 2 },
    { id: 15, name: "Subcategory 2", parentId: 3 },
    { id: 16, name: "Subcategory 3", parentId: 3 },
    { id: 17, name: "Subcategory 1", parentId: 4 },
    { id: 18, name: "Subcategory 2", parentId: 4 },
    { id: 19, name: "Subcategory 3", parentId: 5},
  ]
  
  topics: any = [
    { id: 20, name: "Subsubcategory 1", parentId: 8 },
    { id: 21, name: "Subsubcategory 2", parentId: 8 },
    { id: 22, name: "Subsubcategory 3", parentId: 8 },
    { id: 23, name: "Subcategory 1", parentId: 12 },
    { id: 24, name: "Subcategory 2", parentId: 12 },
    { id: 25, name: "Subcategory 3", parentId: 12 },
    { id: 26, name: "Subcategory 1", parentId: 12 },
    { id: 27, name: "Subcategory 2", parentId: 12 },
    { id: 28, name: "Subcategory 3", parentId: 12 },
    { id: 29, name: "Subcategory 1", parentId: 12 },
    { id: 30, name: "Subcategory 2", parentId: 15 },
    { id: 31, name: "Subcategory 3", parentId: 15 },
  ];
  activeCategory: any;
  activeSubCategory:any;
  ngOnInit() {
    // Set the first category as active by default
    this.activeCategory = this.categories[0];
    this.activeSubCategory = this.subcategories[0];


  }

  setActiveSubCategory(sub: any) {
    this.activeSubCategory = sub;
    console.log("activeSub");
    
  }


  setActiveCategory(category: any) {
    this.activeCategory = category;
    console.log("active");

  }

  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }









  
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
