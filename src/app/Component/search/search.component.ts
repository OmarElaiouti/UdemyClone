import { Component, OnChanges, OnInit } from '@angular/core';
import { Icourses } from '../../Models/ICourse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../Service1/data.service';
import { LastsliderComponent } from '../lastslider/lastslider.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule,LastsliderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements OnChanges {

   //sidebar
   expandedItems: { [key: string]: boolean } = {};

   toggleCollapse(collapseId: string): void {
     this.expandedItems[collapseId] = !this.expandedItems[collapseId];
   }
 
   isExpanded(collapseId: string): boolean {
     return this.expandedItems[collapseId] || false;
   }
     //end slider

     getStarArray(rating: number): number[] {
      const fullStars = Math.floor(rating);
      const halfStars = Math.ceil(rating - fullStars);
      const starArray = Array(fullStars).fill(0);
      if (halfStars > 0) {
          starArray.push(halfStars); // Add half star if applicable
      }
      return starArray;
    }








    

    constructor(private dataserice: DataService) { }
  

    searchTerm: string='';
    results: any[]=[];


      // search() {
      //   this.dataserice.searchProducts(this.searchTerm).subscribe(data => {
      //     this.results = data;
      //   });
      // }

      ngOnChanges(): void {
        this.dataserice.searchProducts(this.searchTerm).subscribe((data) => {
          this.results = data;
        })
      
      }
 



  }
