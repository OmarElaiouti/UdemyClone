import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../Services/category-service/category.service';
import { INotification } from '../../Models/INotification';
import { UserCoursesService } from '../../Services/user-courses-service/user-courses.service';
import { SearchService } from '../../Services/search-service/search.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { IUser } from '../../Models/IUser';
import { UserInfoService } from '../../Services/user-info-service/user-info.service';
import { NotificationService } from '../../Services/notification-service/notification.service';
import { Icourse } from '../../Models/ICourse';
import { Icategory } from '../../Models/ICategory';
import { Subscription, filter } from 'rxjs';
import { NavRefreshService } from '../../Services/nav-refresh-service/nav-refresh.service';
import { LogoutService } from '../../Services/logout-service/logout.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();
  userRoles!: string[];

  searchValue: string = '';

  categories!:Icategory[];
  subcategories!:Icategory[];
  topics!:Icategory[];

  subcategoriesMap!:any;
  topicsMap!:any;

  Cart: Icourse[] = [];
  notifications: INotification[] = [];
  Wishlist: Icourse[] = [];

  activeCategory: any;
  activeSubCategory: any;
  activeTopic!:any;
  
  CartTotalPrice!:String;
  signedin:boolean=false;
  isSidebarOpen: boolean = false;
  user:IUser ={
    id:"",
    firstName:"",
    lastName:"",
    userName:"Student",
    email:"",
    headline:"",
    biography:"",
    image:"https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg",
  };
  private navbarRefreshSubscription!: Subscription;
  filteredSubcategories!: any[];
  filteredTopics!: any[];

  constructor(
    private catService: CategoryService,
    private notifService: NotificationService,
    private userCoursesService: UserCoursesService,
    private searchService: SearchService,
    private router: Router,
    private location: Location,
    private userService: UserInfoService,
    private navbarRefreshService: NavRefreshService,
    private logoutService:LogoutService,
    private jwtHelper: JwtHelperService


  ) { }


 


  ngOnInit() {
    let flagValue = localStorage.getItem("token");

      // Check if the value is not null before parsing it
      if (flagValue) {
        this.signedin = true;

        // Load additional data only if the user is signed in
        this.loadCategories();
        this.filterData()
        this.loadNotifications();
        this.loadCart();
        this.loadWishlist();
        this.loadUserdata();

        const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get user roles
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userRoles = decodedToken.roles; // Assuming roles are stored as an array in 'roles' field
    }
  
        
      } else {
        this.signedin = false;
        this.loadCategories();
            this.filterData()
        this.loadCart();

      }



  }
  

  SetDefaultCategory(){
    this.activeCategory = this.categories[0];
    this.activeSubCategory = null;
    this.activeTopic = null;
  
    // Filter data when active category changes
    this.filterData();
  }


  userIsInstructor(): boolean {
    return this.userRoles && this.userRoles.includes('Instructor');
  }

  loadUserdata(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.user.userName = user.userName

    });
  }

  loadCategories(): void {
    this.catService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      this.activeCategory = categories[0];

      // Initialize maps to store subcategories and topics
      this.subcategoriesMap = new Map<string, Icategory[]>();
      this.topicsMap = new Map<string, Icategory[]>();
  
      categories.forEach(category => {
        // Load subcategories for each category
        this.catService.getSubcategoriesOrTopicsByParentName(category.name).subscribe(subcategories => {
          this.subcategoriesMap.set(category.name, subcategories);
          
          // Load topics for each subcategory
          subcategories.forEach(subcategory => {
            this.catService.getSubcategoriesOrTopicsByParentName(subcategory.name).subscribe(topics => {
              this.topicsMap.set(subcategory.name, topics);
            });
          });
        });
      });
    });
  }


  filterData(): void {
    // Filter subcategories based on the active category
    if (this.activeCategory) {
      this.filteredSubcategories = this.subcategoriesMap.get(this.activeCategory.name) || [];
    } else {
      this.filteredSubcategories = [];
    }
  
    // Filter topics based on the active subcategory
    if (this.activeSubCategory) {
      this.filteredTopics = this.topicsMap.get(this.activeSubCategory.name) || [];
    } else {
      this.filteredTopics = [];
    }
  }
  
  setActiveCategory(category: Icategory): void {
    this.activeCategory = category;
    
    this.activeSubCategory = null;
    this.activeTopic = null;
  
    // Filter data when active category changes
    this.filterData();
  }
  
  setActiveSubCategory(subcategory: Icategory): void {
    this.activeSubCategory = subcategory;
    this.activeTopic = null;
  
    // Filter data when active subcategory changes
    this.filterData();
  }
  
  setActiveTopic(topic: Icategory): void {
    this.activeTopic = topic;
  }

  loadNotifications(): void {
    this.notifService.getNotifications().subscribe(notifs => {
      this.notifications = notifs;
    });
  }

  loadCart(): void {
if(this.signedin){
    this.userCoursesService.getCart().subscribe({
      next:(data)=>{
        this.Cart=data;
        this.CartTotalPrice = this.calculateTotalPrice(this.Cart);

      }
    })
  }else{
    this.userCoursesService.getAnonymousCart().subscribe({
      next:(data)=>{
        this.Cart=data;
        this.CartTotalPrice = this.calculateTotalPrice(this.Cart);
      },
      error: err=>{console.log(err);
      }
    })

  }
  }


  // loadAnonymousCart() {
  //   this.userCoursesService.getAnonymousCart().subscribe({

  //     next:cartItems => {
  //       this.Cart = cartItems;

  //        // Update Cart array with the fetched cart items
  //     },
  //     error:err => {
  //       console.error('Error loading anonymous cart:', err);
  //     }
  // });
  // }


  getNumOfNotificationsWithFalseStatus(): number {
    return this.notifications.filter(notification => !notification.status).length;
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
    const usernameameInitial = this.user.userName.charAt(0).toUpperCase();
    return usernameameInitial;

  }

}

private calculateTotalPrice(cart: Icourse[]): string {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0)
  return totalPrice.toFixed(2);;
}

AddToCart(id:number) {
  // Call the addToCart function from the cart service when the button is clicked
  this.userCoursesService.addToCart(id).subscribe({
    next: response => {
this.Cart.push(response)
console.log('Course added to cart successfully:', response);
    },
    error: err => {
      // Handle error if needed
      console.error('Error adding course to cart:', err);
    }
  }
  );
}

getusername(){
  return this.user.userName
}

  search(searchValue: string): void {
    if(searchValue.length>0)
    this.router.navigate(['/searchresult'], { queryParams: { search: searchValue } });
}

hoverButton() {
if(this.notifications.length>0 ){
  const lastFive = this.notifications.slice(-5);
  lastFive.forEach(notification => {
    notification.status = true;
  });
  this.notifService.setNotificationsLastFiveStatus(lastFive).subscribe({
    next: response =>{},
    error: err => {}
  })
}
this.navbarRefreshService.refreshNavbar();

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


logOut(){

  this.logoutService.logout();
  this.router.navigate([""]);

}
ngOnDestroy(): void {
  this.navbarRefreshSubscription.unsubscribe();
}

}
