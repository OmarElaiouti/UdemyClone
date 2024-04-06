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
  Cart: Icourse[] = [];
  notifications: INotification[] = [];
  Wishlist: Icourse[] = [];
  activeCategory: any;
  activeSubCategory: any;
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
        this.loadCart();

      }
    
      
    
    this.navbarRefreshSubscription = this.navbarRefreshService.refreshSubjectAsObservable$.subscribe(() => {


      let flagValue = localStorage.getItem("token");
      
          // Check if the value is not null before parsing it
          if (flagValue) {
            this.signedin = true;
            // Load additional data only if the user is signed in
            this.loadCategories();
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
            this.loadCart();

            // Reset signedin status if token is null
          }
        })
        
  
    // Subscribe to router navigation events to refresh navbar on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      // Call your functions when the route changes
      next: responce=>{
      this.loadCart();
      this.loadWishlist();
    }, error: err =>{
      console.error('Error in router navigation events subscription:', err);
    }
  });
  
  
  }
  
  userIsInstructor(): boolean {
    return this.userRoles && this.userRoles.includes('Instructor');
  }

  loadUserdata(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      console.log(user);
      this.user.userName = user.userName

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
    this.catService.getSubcategoriesOrTopicsByParentName(parentName).subscribe(subcategories => {
      this.subcategories = subcategories;
      if (this.subcategories.length > 0) {
        this.activeSubCategory = this.subcategories[0];
        this.loadTopics(this.activeSubCategory.name);
      }
    });
  }

  loadTopics(parentName: string): void {
    this.catService.getSubcategoriesOrTopicsByParentName(parentName).subscribe(topics => {
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
