import { Routes } from '@angular/router';
import { CategoryComponent } from './Component/category/category.component';
import { HomeComponent } from './Component/home/home.component';
import { CourcesComponent } from './Component/cources/cources.component';
import { SignupComponent } from './Component/signup/signup.component';
import { LoginComponent } from './Component/login/login.component';
import { CartComponent } from './Component/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'home' },
  { path: 'category', component: CategoryComponent, title: 'category' },
  { path: 'signup', component: SignupComponent, title: 'signup' },
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: 'cart', component: CartComponent, title: 'cart' }
];
