import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Component/footer/footer.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { HomeComponent } from './Component/home/home.component';

import { CartComponent } from './Component/cart/cart.component';

import { MyLearningComponent } from './Component/my-learning/my-learning.component';
import { AccountProfileComponent } from './Component/account-profile/account-profile.component';



@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet,FooterComponent,NavbarComponent,HomeComponent,MyLearningComponent,AccountProfileComponent,SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

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
}
