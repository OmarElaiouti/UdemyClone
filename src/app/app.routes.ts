import { Routes } from '@angular/router';
import { CategoryComponent } from './Component/category/category.component';
import { HomeComponent } from './Component/home/home.component';
import { SignupComponent } from './Component/signup/signup.component';
import { LoginComponent } from './Component/login/login.component';
import { CartComponent } from './Component/cart/cart.component';
import { AboutusComponent } from './Component/aboutus/aboutus.component';
import { ContactusComponent } from './Component/contactus/contactus.component';
import { TechOnUdemyComponent } from './Component/tech-on-udemy/tech-on-udemy.component';
import { SupportComponent } from './Component/support/support.component';
import { CourseDetailsComponent } from './Component/course-details/course-details.component';
import { SearchComponent } from './Component/search/search.component';
import { AccountProfileComponent } from './Component/account-profile/account-profile.component';
import { MyLearningComponent } from './Component/my-learning/my-learning.component';
import { NotificationComponent } from './Component/notification/notification.component';
import { CheckOutComponent } from './Component/check-out/check-out.component';

SignupComponent
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'home' },
  { path: 'category', component: CategoryComponent, title: 'category' },
  { path: 'signup', component: SignupComponent, title: 'signup' },
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: 'cart', component: CartComponent, title: 'cart' },
  { path: 'aboutus', component: AboutusComponent, title: 'aboutus' },
  { path: 'contactus', component: ContactusComponent, title: 'contactus' },
  { path: 'techOnUdemy', component: TechOnUdemyComponent, title: 'techOnUdemy' },
  { path: 'support', component: SupportComponent, title: 'support' },
  { path: 'coursedetails', component: CourseDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'searchresult', component: SearchComponent },
  { path: 'profile', component: AccountProfileComponent },
  { path: 'myCourses', component: MyLearningComponent },
  { path: 'teachUdemy', component: TechOnUdemyComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lessons', component: CourseDetailsComponent },
  { path: 'notifications', component: NotificationComponent },
\  { path: 'checkout', component: CheckOutComponent },




];
