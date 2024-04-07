import { Component, HostBinding } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './Component/footer/footer.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { HomeComponent } from './Component/home/home.component';
import { CartComponent } from './Component/cart/cart.component';
import { MyLearningComponent } from './Component/my-learning/my-learning.component';
import { AccountProfileComponent } from './Component/account-profile/account-profile.component';
import { CategoryComponent } from "./Component/category/category.component";
import { CourseDetailsComponent } from "./Component/course-details/course-details.component";
import { CourseLessonComponent } from "./Component/CourseLessons/course-lesson/course-lesson.component";
import { SearchComponent } from './Component/search/search.component';
import { NotificationComponent } from "./Component/notification/notification.component";
import { CheckOutComponent } from "./Component/check-out/check-out.component";
import { LastsliderComponent } from "./Component/lastslider/lastslider.component";
import { CertificateComponent } from "./Component/certificate/certificate.component";
import { InstructorDashboardComponent } from "./Component/instructor-dashboard/instructor-dashboard.component";
import { Next1Component } from "./Component/next1/next1.component";
import { Next2Component } from "./Component/next2/next2.component";
import { Next3Component } from "./Component/next3/next3.component";
import { DashboardComponent } from "./Component/dashboard/dashboard.component";
import { InstructorCoursesComponent } from "./Component/instructor-courses/instructor-courses.component";
import { UpdateCourseComponent } from "./Component/update-course/update-course.component";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, FooterComponent, NavbarComponent, HomeComponent, MyLearningComponent, AccountProfileComponent, CartComponent, CategoryComponent, CourseDetailsComponent,
        SearchComponent, CourseLessonComponent , CheckOutComponent, LastsliderComponent, NotificationComponent, CertificateComponent, InstructorDashboardComponent, Next1Component, Next2Component, Next3Component, DashboardComponent, InstructorCoursesComponent, UpdateCourseComponent]
})
export class AppComponent {
  title = 'graduation_proj';

  expandedItems: { [key: string]: boolean } = {};

  toggleCollapse(collapseId: string): void {
    this.expandedItems[collapseId] = !this.expandedItems[collapseId];
  }

  isExpanded(collapseId: string): boolean {
    return this.expandedItems[collapseId] || false;
  }

  @HostBinding('class.hide') hideNavbar = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the one where you want to hide the navbar
        this.hideNavbar = event.url === '/specific-route';
      }
    });
  }
}
