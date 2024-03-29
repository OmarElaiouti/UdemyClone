import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  expandedItems: { [key: string]: boolean } = {};

  toggleCollapse(collapseId: string): void {
    this.expandedItems[collapseId] = !this.expandedItems[collapseId];
  }

  isExpanded(collapseId: string): boolean {
    return this.expandedItems[collapseId] || false;
  }

  checkoutCart: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Retrieve the checkout cart from localStorage
    const checkoutCartString = localStorage.getItem('checkoutCart');
    this.checkoutCart = checkoutCartString ? JSON.parse(checkoutCartString) : [];
    console.log(this.checkoutCart);
  }
}
