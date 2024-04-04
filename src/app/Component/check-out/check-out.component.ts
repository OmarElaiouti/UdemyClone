import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCoursesService } from '../../Services/user-courses-service/user-courses.service';
import { Router, RouterModule } from '@angular/router';

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
  totalPrice!:string;
  totalDiscount:string="0.00"
  constructor(private usercoursesService:UserCoursesService,private router:Router) { }

  ngOnInit(): void {
    // Retrieve the checkout cart from localStorage
    const checkoutCartString = localStorage.getItem('checkoutCart');
    this.checkoutCart = checkoutCartString ? JSON.parse(checkoutCartString) : [];
    console.log(this.checkoutCart);
    this.totalPrice= this.calculateTotalPrice(this.checkoutCart);
  }

  compelete():void{
    this.usercoursesService.CompeleteCheckOut().subscribe({
      next:() => {
        localStorage.removeItem("checkoutCart");
        this.router.navigate([''])
      },
      error:(error) => {
        console.error('Error moving course to wishlist:', error);
        // Handle error appropriately
      }
});
  }

  private calculateTotalPrice(courses: any[]): string {
    const totalPrice = courses.reduce((total, item) => total + item.price, 0)
    return totalPrice.toFixed(2);;
  }

  FinalPrice() {
    // Convert strings to numbers
    const totalPrice = parseFloat(this.totalPrice);
    const totalDiscount = parseFloat(this.totalDiscount);
    
    // Check if conversion is successful
    if (isNaN(totalPrice) || isNaN(totalDiscount)) {
        console.error("Error: Invalid input. Please provide numeric values.");
        return NaN; // or any other error handling mechanism
    }
    
    // Perform the subtraction
    const finalPrice = totalPrice - totalDiscount;
    return finalPrice.toString();}
}
