import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IcategoryForNav } from '../../Models/ICategory';
import { CategoryService } from '../../Services/category-service/category.service';
import { INotification } from '../../Models/INotification';
import { NotificationService } from '../../Services/Notification-service/notification.service';
import { IcourseSmallCard, IuserCourse } from '../../Models/ICourse';
import { UserCoursesService } from '../../Services/user-courses-service/user-courses.service';
import { SearchService } from '../../Services/search-service/search.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  @ViewChild('div1') div1!: ElementRef;
  @ViewChild('div2') div2!: ElementRef;
  searchValue: string = '';
  categories: IcategoryForNav[] = [
    {id:1,
      name:"cat"},
      {id:1,
        name:"cat"},
        {id:1,
          name:"cat"},
          {id:1,
            name:"cat"},
            {id:1,
              name:"cat"},
              {id:1,
                name:"cat"}

  ];
  subcategories: IcategoryForNav[] = [{id:1,
    name:"cat"},
    {id:1,
      name:"cat"},
      {id:1,
        name:"cat"},
        {id:1,
          name:"cat"},
          {id:1,
            name:"cat"},
            {id:1,
              name:"cat"}];
  topics: IcategoryForNav[] = [{id:1,
    name:"cat"},
    {id:1,
      name:"cat"},
      {id:1,
        name:"cat"},
        {id:1,
          name:"cat"},
          {id:1,
            name:"cat"},
            {id:1,
              name:"cat"}];
  Cart: IuserCourse[] = [];
  notifications: INotification[] = [];
  Wishlist: IuserCourse[] = [];
  activeCategory: any;
  activeSubCategory: any;
  CartTotalPrice = 0;
  signedin: any;
  isSidebarOpen: boolean = false;

  constructor(
    private catService: CategoryService,
    private notifService: NotificationService,
    private userCoursesService: UserCoursesService,
    private searchService: SearchService,
    private router: Router,
    private location: Location
  ) { }


  
  
  ngOnInit() {

    this.loadCategories();
    this.loadNotifications();
    this.loadCart();
    this.loadWishlist();


    // Set the first category as active by default

    // this.setActiveCategory(this.categories[0]);
    // this.setActiveSubCategory(this.subcategories[0]);

    let flagValue = localStorage.getItem("flag") ?? null;

    // Check if the value is not null before parsing it
    if (flagValue == null) {

      // Parse the value as JSON
      localStorage.setItem("flag", JSON.stringify(true))
    } else {
      this.signedin = false;
    }

    if (this.Cart.length != 0) {
      let prices = this.Cart.map(item => item.price);
      this.CartTotalPrice = prices.reduce((acc, curr) => acc + curr, 0);
    }


  }


  loadCategories(): void {
    this.catService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      if (this.categories.length > 0) {
        this.activeCategory = this.categories[0];
        this.loadSubcategories(this.activeCategory.name);
      }
    });
  }

  loadSubcategories(parentName: string): void {
    this.catService.getSubcategoriesByParent(parentName).subscribe(subcategories => {
      this.subcategories = subcategories;
      if (this.subcategories.length > 0) {
        this.activeSubCategory = this.subcategories[0];
        this.loadTopics(this.activeSubCategory.name);
      }
    });
  }

  loadTopics(parentName: string): void {
    this.catService.getHighestScoreTopicByParent(parentName).subscribe(topics => {
      this.topics = topics;
    });
  }

  setActiveCategory(category: any): void {
    this.activeCategory = category;
    this.loadSubcategories(category.name);
  }

  setActiveSubCategory(sub: any): void {
    this.activeSubCategory = sub;
    this.loadTopics(sub.name);
  }

  loadNotifications(): void {
    this.notifService.getNotifications().subscribe(notifs => {
      this.notifications = notifs;
    });
  }

  loadCart(): void {
    this.userCoursesService.getCart().subscribe(cart => {
      this.Cart = cart;
    });
  }

  loadWishlist(): void {
    this.userCoursesService.getWishlist().subscribe(wishlist => {
      this.Wishlist = wishlist;
    });
  }



  search(searchValue: string): void {
    if(searchValue.length>0)
    this.router.navigate(['/searchresult'], { queryParams: { search: searchValue } });
}



  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  ngAfterViewInit() {
    this.setDiv1Height(); // Call the function initially
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setDiv1Height(); // Call the function whenever the window resizes
  }

  setDiv1Height() {
    // Accessing nativeElement to get the height
    const div2Height = this.div1.nativeElement.offsetHeight;
    // Setting height of div1 to be equal to the height of div2
    this.div2.nativeElement.style.height = div2Height + 'px';
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
