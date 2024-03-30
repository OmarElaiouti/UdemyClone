import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../Services/category-service/category.service';
import { INotification } from '../../Models/INotification';

import { UserCoursesService } from '../../Services/user-courses-service/user-courses.service';
import { SearchService } from '../../Services/search-service/search.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { IUser } from '../../Models/IUser';
import { UserInfoService } from '../../Services/user-info-service/user-info.service';
import { NotificationService } from '../../Services/Notification-service/notification.service';

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
  categories!:any[];
  subcategories!:any[];
  topics!:any[];
  Cart: any[] = [];
  notifications: INotification[] = [];
  Wishlist: any[] = [];
  activeCategory: any;
  activeSubCategory: any;
  CartTotalPrice = 0;
  signedin:boolean=false;
  isSidebarOpen: boolean = false;
  user!:IUser;

  constructor(
    private catService: CategoryService,
    private notifService: NotificationService,
    private userCoursesService: UserCoursesService,
    private searchService: SearchService,
    private router: Router,
    private location: Location,
    private userService: UserInfoService

  ) { }




  ngOnInit() {

    this.loadCategories();
    this.loadNotifications();
    this.loadCart();
    this.loadWishlist();
    this.loadWishlist();
    this.loadUserdata();

    // Set the first category as active by default

    // this.setActiveCategory(this.categories[0]);
    // this.setActiveSubCategory(this.subcategories[0]);

    let flagValue = localStorage.getItem("token") ?? null;

    // Check if the value is not null before parsing it
    if (flagValue) {
      this.signedin = true;
    }

    if (this.Cart.length != 0) {
      let prices = this.Cart.map(item => item.price);
      this.CartTotalPrice = prices.reduce((acc, curr) => acc + curr, 0);
    }


  }

  loadUserdata(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;

    });
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

GetLetters(){
  if( this.user.firstName && this.user.lastName ){
  const firstNameInitial = this.user.firstName.charAt(0).toUpperCase();
          const lastNameInitial = this.user.lastName.charAt(0).toUpperCase();
          return firstNameInitial + lastNameInitial;
  }else if(this.user.firstName){
    const firstNameInitial = this.user.firstName.charAt(0).toUpperCase();
return firstNameInitial;
  }
  else{
    const usernameameInitial = this.user.username.charAt(0).toUpperCase();
    return usernameameInitial;

  }

}


  search(searchValue: string): void {
    if(searchValue.length>0)
    this.router.navigate(['/searchresult'], { queryParams: { search: searchValue } });
}

GotoCategory(name: string): void {
  if(name.length>0)
  this.router.navigate(['/category'], { queryParams: { name: name } });
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
    const div1Height = this.div1.nativeElement.offsetHeight;
    // Setting height of div1 to be equal to the height of div2
    this.div2.nativeElement.style.height = div1Height + 'px';
  }





  goToWishlist() {
    this.router.navigate(['/myCourses'], { queryParams: { activeTab: 'wishlist' } });
  }
  goToMyLearning() {
    this.router.navigate(['/myCourses'], { queryParams: { activeTab: 'myLearning' } });
  }




}
