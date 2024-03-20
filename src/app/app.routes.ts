import { Routes } from '@angular/router';
import { CategoryComponent } from './Component/category/category.component';
import { HomeComponent } from './Component/home/home.component';
import { CourcesComponent } from './Component/cources/cources.component';
import { SignupComponent } from './Component/signup/signup.component';
import { LoginComponent } from './Component/login/login.component';
import { CartComponent } from './Component/cart/cart.component';
import { AboutusComponent } from './Component/aboutus/aboutus.component';
import { ContactusComponent } from './Component/contactus/contactus.component';
import { TechOnUdemyComponent } from './Component/tech-on-udemy/tech-on-udemy.component';
<<<<<<< HEAD
import { SupportComponent } from './Component/support/support.component';
=======
>>>>>>> c3bbbab70f00f3925282c1e1403bb94030adfc26

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'home' },
  { path: 'category', component: CategoryComponent, title: 'category' },
  { path: 'signup', component: SignupComponent, title: 'signup' },
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: 'cart', component: CartComponent, title: 'cart' },
  { path: 'aboutus', component: AboutusComponent, title: 'aboutus' },
  { path: 'contactus', component: ContactusComponent, title: 'contactus' },
<<<<<<< HEAD
  { path: 'techOnUdemy', component: TechOnUdemyComponent, title: 'techOnUdemy' },
  { path: 'support', component: SupportComponent, title: 'support' }

=======
  { path: 'techOnUdemy', component: TechOnUdemyComponent, title: 'techOnUdemy' }
>>>>>>> c3bbbab70f00f3925282c1e1403bb94030adfc26


];
